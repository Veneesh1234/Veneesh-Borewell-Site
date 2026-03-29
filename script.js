const WHATSAPP_NUMBER = '9550443003';
const BASELINE_KEY = 'vb_fraud_baseline_v1';
const SUBMISSION_WINDOW_KEY = 'vb_submission_window_v1';

const RISK_LEVELS = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
};

const MOTOR_VARIANTS = {
    'C.R.I Pumps': [
        'Submersible Motor - Steelx Pumps',
        'Submersible Motor - Genie Pumps',
        'Monoblock Motor',
        'Waste Water Sewage Motor'
    ],
    'Texmo Taro Pumps': [
        'Aqua Pumps',
        'Taro Pumps',
        'Monoblock Pumps'
    ],
    'Assembly Pumps': [
        'Submersible Motors'
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    const toggleHeaderState = () => {
        if (window.scrollY > 60) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState);
});

function getBaseline() {
    try {
        const parsed = JSON.parse(localStorage.getItem(BASELINE_KEY));
        if (parsed && typeof parsed.count === 'number') {
            return parsed;
        }
    } catch (error) {
        console.warn('Baseline parse failed:', error);
    }

    return {
        count: 0,
        nameMean: 8,
        nameVar: 4,
        addrMean: 35,
        addrVar: 40
    };
}

function updateRunningStats(mean, variance, count, value) {
    const newCount = count + 1;
    const delta = value - mean;
    const newMean = mean + delta / newCount;
    const delta2 = value - newMean;
    const newVariance = ((variance * count) + (delta * delta2)) / newCount;
    return { mean: newMean, variance: Math.max(newVariance, 1) };
}

function updateBaseline(name, address) {
    const baseline = getBaseline();

    const nameStats = updateRunningStats(
        baseline.nameMean,
        baseline.nameVar,
        baseline.count,
        name.length
    );

    const addrStats = updateRunningStats(
        baseline.addrMean,
        baseline.addrVar,
        baseline.count,
        address.length
    );

    const updated = {
        count: baseline.count + 1,
        nameMean: nameStats.mean,
        nameVar: nameStats.variance,
        addrMean: addrStats.mean,
        addrVar: addrStats.variance
    };

    localStorage.setItem(BASELINE_KEY, JSON.stringify(updated));
}

function getRecentSubmissions() {
    try {
        const list = JSON.parse(localStorage.getItem(SUBMISSION_WINDOW_KEY)) || [];
        const now = Date.now();
        const valid = list.filter(ts => now - ts < 10 * 60 * 1000);
        localStorage.setItem(SUBMISSION_WINDOW_KEY, JSON.stringify(valid));
        return valid;
    } catch (error) {
        return [];
    }
}

function trackSubmission() {
    const list = getRecentSubmissions();
    list.push(Date.now());
    localStorage.setItem(SUBMISSION_WINDOW_KEY, JSON.stringify(list));
}

function sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
}

function calculateFraudRisk(payload) {
    const baseline = getBaseline();
    const recentSubmissions = getRecentSubmissions().length;

    const suspiciousWords = /(bitcoin|crypto|otp|urgent money|loan|free cash|click here|http|www\.)/i;
    const repeatedChars = /(.)\1{3,}/;

    const name = payload.name || '';
    const address = payload.address || '';
    const messageText = `${name} ${address} ${payload.product || ''} ${payload.variant || ''}`;

    const nameDigitsRatio = (name.match(/\d/g) || []).length / Math.max(name.length, 1);
    const nameAnomaly = Math.abs(name.length - baseline.nameMean) / Math.sqrt(Math.max(baseline.nameVar, 1));
    const addrAnomaly = Math.abs(address.length - baseline.addrMean) / Math.sqrt(Math.max(baseline.addrVar, 1));

    const features = {
        botTrap: payload.botTrapFilled ? 1 : 0,
        suspiciousWords: suspiciousWords.test(messageText) ? 1 : 0,
        repeatedChars: repeatedChars.test(messageText) ? 1 : 0,
        nameDigitsRatio,
        shortAddress: address.length < 8 ? 1 : 0,
        rapidFireSubmissions: recentSubmissions >= 3 ? 1 : 0,
        nameAnomaly: Math.min(nameAnomaly / 3, 1),
        addrAnomaly: Math.min(addrAnomaly / 3, 1)
    };

    const linearScore =
        -2.1 +
        3.2 * features.botTrap +
        1.4 * features.suspiciousWords +
        0.9 * features.repeatedChars +
        1.6 * features.nameDigitsRatio +
        0.7 * features.shortAddress +
        1.2 * features.rapidFireSubmissions +
        1.1 * features.nameAnomaly +
        1.0 * features.addrAnomaly;

    const riskScore = sigmoid(linearScore);
    const riskLevel = riskScore >= 0.72 ? RISK_LEVELS.HIGH : riskScore >= 0.45 ? RISK_LEVELS.MEDIUM : RISK_LEVELS.LOW;

    return { riskScore, riskLevel, features };
}

function setRiskStatus(elementId, message, level) {
    const status = document.getElementById(elementId);
    if (!status) {
        return;
    }

    status.textContent = message;
    status.classList.remove('risk-low', 'risk-medium', 'risk-high');

    if (level === RISK_LEVELS.LOW) {
        status.classList.add('risk-low');
    } else if (level === RISK_LEVELS.MEDIUM) {
        status.classList.add('risk-medium');
    } else if (level === RISK_LEVELS.HIGH) {
        status.classList.add('risk-high');
    }
}

function isSubmissionAllowed(payload, statusElementId) {
    const result = calculateFraudRisk(payload);
    const scoreText = `AI Risk Score: ${(result.riskScore * 100).toFixed(0)}%`;

    if (result.riskLevel === RISK_LEVELS.HIGH) {
        setRiskStatus(statusElementId, `${scoreText} - submission blocked for safety. Please call us directly.`, RISK_LEVELS.HIGH);
        alert('This request was flagged as high risk by AI fraud detection and has been blocked. Please call us directly to proceed.');
        return false;
    }

    if (result.riskLevel === RISK_LEVELS.MEDIUM) {
        setRiskStatus(statusElementId, `${scoreText} - additional verification recommended.`, RISK_LEVELS.MEDIUM);
        const proceed = confirm('Your request needs additional verification. Do you want to continue to WhatsApp?');
        if (!proceed) {
            return false;
        }
    } else {
        setRiskStatus(statusElementId, `${scoreText} - verified as low risk.`, RISK_LEVELS.LOW);
    }

    return true;
}

function openAppointmentDialog(serviceName) {
    const modal = document.getElementById('appointmentModal');
    const serviceInput = document.getElementById('serviceType');

    serviceInput.value = serviceName;
    modal.classList.add('show');

    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 100);

    document.body.style.overflow = 'hidden';
}

function closeAppointmentDialog() {
    const modal = document.getElementById('appointmentModal');
    const form = document.getElementById('appointmentForm');

    modal.classList.remove('show');
    form.reset();
    setRiskStatus('appointmentRiskStatus', '', null);
    document.body.style.overflow = 'auto';
}

function submitAppointment(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const serviceType = document.getElementById('serviceType').value.trim();
    const botTrapValue = document.getElementById('appointmentWebsite').value.trim();

    if (!customerName || !customerPhone || !customerAddress || !serviceType) {
        alert('Please fill in all required fields.');
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    if (customerName.length < 3) {
        alert('Please enter a valid name (at least 3 characters).');
        return;
    }

    const allowed = isSubmissionAllowed(
        {
            name: customerName,
            address: customerAddress,
            product: serviceType,
            botTrapFilled: Boolean(botTrapValue)
        },
        'appointmentRiskStatus'
    );

    if (!allowed) {
        return;
    }

    const message = `🔧 New Appointment Request%0A%0AName: ${encodeURIComponent(customerName)}%0APhone: ${encodeURIComponent(customerPhone)}%0AAddress: ${encodeURIComponent(customerAddress)}%0AService: ${encodeURIComponent(serviceType)}%0A%0AThank you for choosing Veneesh Borewells!`;
    const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;

    updateBaseline(customerName, customerAddress);
    trackSubmission();
    window.open(whatsappUrl, '_blank');
    closeAppointmentDialog();
    alert('✓ Redirecting to WhatsApp... Please send the message to confirm your appointment.');
}

function openControlPanelDialog(panelName) {
    const modal = document.getElementById('buyModal');
    const productInput = document.getElementById('motorType');
    const variantSelect = document.getElementById('motorVariant');

    productInput.value = panelName;
    variantSelect.innerHTML = '';

    const option = document.createElement('option');
    option.value = panelName;
    option.textContent = panelName;
    option.selected = true;
    variantSelect.appendChild(option);

    document.getElementById('buyForm').reset();
    productInput.value = panelName;

    modal.classList.add('show');
    setTimeout(() => {
        document.getElementById('buyCustomerName').focus();
    }, 100);
    document.body.style.overflow = 'hidden';
}

function openBuyDialog(productName) {
    const modal = document.getElementById('buyModal');
    const productInput = document.getElementById('motorType');
    const variantSelect = document.getElementById('motorVariant');

    productInput.value = productName;
    variantSelect.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select type';
    placeholder.disabled = true;
    placeholder.selected = true;
    variantSelect.appendChild(placeholder);

    const variants = MOTOR_VARIANTS[productName] || [];
    variants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant;
        option.textContent = variant;
        variantSelect.appendChild(option);
    });

    document.getElementById('buyForm').reset();
    productInput.value = productName;

    modal.classList.add('show');
    setTimeout(() => {
        document.getElementById('buyCustomerName').focus();
    }, 100);
    document.body.style.overflow = 'hidden';
}

function closeBuyDialog() {
    const modal = document.getElementById('buyModal');
    const form = document.getElementById('buyForm');

    modal.classList.remove('show');
    form.reset();
    setRiskStatus('buyRiskStatus', '', null);
    document.body.style.overflow = 'auto';
}

function submitBuyInquiry(event) {
    event.preventDefault();

    const customerName = document.getElementById('buyCustomerName').value.trim();
    const customerPhone = document.getElementById('buyCustomerPhone').value.trim();
    const customerAddress = document.getElementById('buyCustomerAddress').value.trim();
    const product = document.getElementById('motorType').value.trim();
    const variant = document.getElementById('motorVariant').value.trim();
    const botTrapValue = document.getElementById('buyWebsite').value.trim();

    if (!customerName || !customerPhone || !customerAddress || !product || !variant) {
        alert('Please fill in all required fields.');
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    if (customerName.length < 3) {
        alert('Please enter a valid name (at least 3 characters).');
        return;
    }

    const allowed = isSubmissionAllowed(
        {
            name: customerName,
            address: customerAddress,
            product,
            variant,
            botTrapFilled: Boolean(botTrapValue)
        },
        'buyRiskStatus'
    );

    if (!allowed) {
        return;
    }

    const message = `🛠️ Product Inquiry%0A%0AName: ${encodeURIComponent(customerName)}%0APhone: ${encodeURIComponent(customerPhone)}%0AAddress: ${encodeURIComponent(customerAddress)}%0AProduct: ${encodeURIComponent(product)}%0AType: ${encodeURIComponent(variant)}%0A%0APlease share availability, specifications, and quotation.`;
    const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;

    updateBaseline(customerName, customerAddress);
    trackSubmission();
    window.open(whatsappUrl, '_blank');
    closeBuyDialog();
    alert('✓ Redirecting to WhatsApp... Please send the message to receive your quotation.');
}

window.addEventListener('click', function(event) {
    const appointmentModal = document.getElementById('appointmentModal');
    const buyModal = document.getElementById('buyModal');

    if (event.target === appointmentModal) {
        closeAppointmentDialog();
    }

    if (event.target === buyModal) {
        closeBuyDialog();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key !== 'Escape') {
        return;
    }

    const appointmentModal = document.getElementById('appointmentModal');
    const buyModal = document.getElementById('buyModal');

    if (appointmentModal.classList.contains('show')) {
        closeAppointmentDialog();
    }

    if (buyModal.classList.contains('show')) {
        closeBuyDialog();
    }
});
