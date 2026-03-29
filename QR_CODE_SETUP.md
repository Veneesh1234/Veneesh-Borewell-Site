# 🖼️ UPI QR CODE SETUP

## ✅ QR Code Image Added to Website

Your UPI QR code image has been set up to display in the Payment Methods section.

### What's Done
✅ Payment section updated with QR code image reference
✅ HTML already has `<img src="upi-qr-code.png">` in place
✅ WhatsApp number updated to 9550443003
✅ QR code will display when image file is present

### Important: Upload Image File

**The image file needs to be in the same folder as your website files:**

```
Borewell website/
├── index.html
├── script.js
├── styles.css
├── upi-qr-code.png  ← Add your QR code image here
├── PAYMENT_INFO.md
└── ... other files
```

### How to Add the Image

1. **Save your QR code image** with this exact filename: `upi-qr-code.png`
2. **Place it in the Borewell website folder** (same folder as index.html)
3. **Refresh your website** (http://localhost:8000)
4. **QR code will appear** in the "Scan QR Code" payment section

### What It Will Look Like

When image is uploaded correctly:

```
┌─────────────────────────────┐
│  💳 Payment Methods          │
├─────────────────────────────┤
│                             │
│  📱 UPI          🔲 QR      │  💬 WhatsApp
│                  Code       │
│  UPI ID      [QR IMAGE]     │  Chat on
│  Copy        Appears here   │  WhatsApp
│              when file      │
│              is present     │
└─────────────────────────────┘
```

### If Image Doesn't Show

If you don't see the QR code in your website:

1. **Check file location:**
   - Is `upi-qr-code.png` in the Borewell website folder?
   - Is the filename exactly `upi-qr-code.png`? (case-sensitive on some systems)
   - Is it a .png file? (not .jpg or other format)

2. **Refresh the browser:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Try different browser

3. **Check browser console:**
   - Press F12 to open developer tools
   - Look for red errors about "upi-qr-code.png"
   - This will tell you if file is missing

### Payment Section Details

#### UPI Payment Method
```
Icon: 📱
Title: Direct UPI Payment
Details: Copy UPI ID and pay from any UPI app
UPI ID: vanishsaidram3763@oksbi
Button: Copy UPI ID (copies to clipboard)
```

#### QR Code Payment Method ← YOUR IMAGE
```
Icon: 🔲
Title: Scan QR Code
Details: Scan with any UPI app to pay instantly
Image: upi-qr-code.png (your QR code)
Note: Shows automatically when image file is present
```

#### WhatsApp Payment Method
```
Icon: 💬
Title: WhatsApp Payment
Details: Send payment request via WhatsApp
Button: Chat on WhatsApp
Number: 9550443003 (updated)
```

### How Customers Use QR Code

1. **Customer opens website**
2. **Scrolls to Payment Methods section**
3. **Sees "Scan QR Code" card**
4. **Opens their UPI app** (Google Pay, PhonePe, etc.)
5. **Clicks "Scan QR Code" in their UPI app**
6. **Points phone camera at your QR code**
7. **UPI app opens with payment details pre-filled**
8. **Enters amount and sends payment**
9. **Payment confirmed!**

### Testing QR Code

Once image is uploaded:

1. **Test on desktop:**
   - Open http://localhost:8000
   - Scroll to "Payment Methods"
   - See "Scan QR Code" section
   - QR code image should display

2. **Test on mobile:**
   - Find your computer's IP address
   - Open http://[IP]:8000 on phone
   - Scroll to Payment Methods
   - Try opening UPI app
   - Attempt to scan QR code

### Important Notes

✅ **File must be named exactly:** `upi-qr-code.png`
✅ **File must be in website folder** (not subfolder)
✅ **Image must be .png format**
✅ **Works with all UPI apps**
✅ **Works on all devices**
✅ **Fallback shows if image missing** (doesn't break site)

### Deployment to Netlify

When you deploy to Netlify:

1. **Include upi-qr-code.png** in the folder you upload
2. **Upload all files together** (don't forget the image!)
3. **Netlify will serve the image** automatically
4. **QR code works live** on internet

**Remember:** Don't deploy without the QR code image, or customers won't be able to scan!

### File Checklist

Before deploying to Netlify, ensure you have:

- [ ] index.html
- [ ] script.js
- [ ] styles.css
- [ ] upi-qr-code.png ← **Don't forget!**
- [ ] Any images (motor images, panel images, etc.)
- [ ] All documentation files (optional but recommended)

---

**Status:** ✅ Ready for QR code image
**Next Step:** Place upi-qr-code.png in website folder
**Result:** Professional payment section with QR code display

Your website is ready to display the QR code once you upload the image file! 🎉
