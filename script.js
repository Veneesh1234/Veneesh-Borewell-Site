// WhatsApp phone number for appointments
const WHATSAPP_NUMBER = '9494751475';

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    const toggleHeaderState = () => {
        const threshold = 60;
        if (window.scrollY > threshold) {
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

// Open Appointment Dialog
function openAppointmentDialog(serviceName) {
    const modal = document.getElementById('appointmentModal');
    const serviceInput = document.getElementById('serviceType');
    
    // Set the service name
    serviceInput.value = serviceName;
    
    // Show the modal
    modal.classList.add('show');
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('customerName').focus();
    }, 100);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close Appointment Dialog
function closeAppointmentDialog() {
    const modal = document.getElementById('appointmentModal');
    const form = document.getElementById('appointmentForm');
    
    modal.classList.remove('show');
    form.reset();
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Submit Appointment Form
function submitAppointment(event) {
    event.preventDefault();
    
    const form = event.target;
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const serviceType = document.getElementById('serviceType').value.trim();
    
    // Validate form
    if (!customerName || !customerPhone || !customerAddress || !serviceType) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // Validate name (at least 3 characters)
    if (customerName.length < 3) {
        alert('Please enter a valid name (at least 3 characters).');
        return;
    }
    
    // Format message for WhatsApp
    const message = `🔧 New Appointment Request%0A%0AName: ${encodeURIComponent(customerName)}%0APhone: ${encodeURIComponent(customerPhone)}%0AAddress: ${encodeURIComponent(customerAddress)}%0AService: ${encodeURIComponent(serviceType)}%0A%0AThank you for choosing Veneesh Borewells!`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset form
    closeAppointmentDialog();
    
    // Show success message
    alert('✓ Redirecting to WhatsApp... Please send the message to confirm your appointment.');
}

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

// Open Control Panel Dialog (uses same buy dialog)
function openControlPanelDialog(panelName) {
    const modal = document.getElementById('buyModal');
    const motorInput = document.getElementById('motorType');
    const motorVariantSelect = document.getElementById('motorVariant');
    
    // Set the control panel name
    motorInput.value = panelName;
    
    // Clear variants for control panels (they don't have variants)
    motorVariantSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = panelName;
    option.textContent = panelName;
    option.selected = true;
    motorVariantSelect.appendChild(option);
    
    // Show the modal
    modal.classList.add('show');
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('buyCustomerName').focus();
    }, 100);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Open Buy Dialog
function openBuyDialog(motorName) {
    const modal = document.getElementById('buyModal');
    const motorInput = document.getElementById('motorType');
    const motorVariantSelect = document.getElementById('motorVariant');
    
    // Set the motor name
    motorInput.value = motorName;
    
    // Populate variants based on brand
    const variants = MOTOR_VARIANTS[motorName] || [];
    motorVariantSelect.innerHTML = '';
    
    // Add placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select motor type';
    placeholder.disabled = true;
    placeholder.selected = true;
    motorVariantSelect.appendChild(placeholder);

    variants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant;
        option.textContent = variant;
        motorVariantSelect.appendChild(option);
    });
    
    // Show the modal
    modal.classList.add('show');
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('buyCustomerName').focus();
    }, 100);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close Buy Dialog
function closeBuyDialog() {
    const modal = document.getElementById('buyModal');
    const form = document.getElementById('buyForm');
    
    modal.classList.remove('show');
    form.reset();
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Submit Buy Inquiry Form
function submitBuyInquiry(event) {
    event.preventDefault();
    
    const form = event.target;
    const customerName = document.getElementById('buyCustomerName').value.trim();
    const customerPhone = document.getElementById('buyCustomerPhone').value.trim();
    const customerAddress = document.getElementById('buyCustomerAddress').value.trim();
    const motorType = document.getElementById('motorType').value.trim();
    const motorVariant = document.getElementById('motorVariant').value.trim();
    
    // Validate form
    if (!customerName || !customerPhone || !customerAddress || !motorType || !motorVariant) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // Validate name (at least 3 characters)
    if (customerName.length < 3) {
        alert('Please enter a valid name (at least 3 characters).');
        return;
    }
    
    // Format message for WhatsApp
    const message = `💳 Motor Purchase Inquiry%0A%0AName: ${encodeURIComponent(customerName)}%0APhone: ${encodeURIComponent(customerPhone)}%0AAddress: ${encodeURIComponent(customerAddress)}%0ABrand: ${encodeURIComponent(motorType)}%0AMotor Type: ${encodeURIComponent(motorVariant)}%0A%0APlease provide pricing and availability information.`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/91${WHATSAPP_NUMBER}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset form
    closeBuyDialog();
    
    // Show success message
    alert('✓ Redirecting to WhatsApp... Please send the message to get pricing details.');
}

// Close modals when clicking outside
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

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const appointmentModal = document.getElementById('appointmentModal');
        const buyModal = document.getElementById('buyModal');
        
        if (appointmentModal.classList.contains('show')) {
            closeAppointmentDialog();
        }
        
        if (buyModal.classList.contains('show')) {
            closeBuyDialog();
        }
    }
});
