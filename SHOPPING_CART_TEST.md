# 🛒 Shopping Cart - Quick Test Guide

## Testing the New Shopping Cart Feature

### Step 1: Refresh Your Browser
1. Press **F5** or **Ctrl+R** to reload http://localhost:8000
2. You should see a new **🛒 0** button in the top-right navigation

### Step 2: Test Adding Items to Cart

#### Test Case 1: Add Single Item
1. Scroll down to **"Motor Sales & Services"** section
2. Click **"Buy Now"** on any motor (e.g., C.R.I Pumps)
3. **Expected**: Popup says "✓ C.R.I Pumps added to cart!"
4. **Verify**: Cart icon now shows **🛒 1** (number increased)

#### Test Case 2: Add Multiple Items
1. Click **"Buy Now"** on another motor (e.g., Texmo Taro Pumps)
2. **Expected**: Popup confirmation appears
3. **Verify**: Cart icon now shows **🛒 2**
4. Repeat with Control Panel products
5. **Verify**: Cart count keeps increasing

#### Test Case 3: Add Same Item Twice
1. Click **"Buy Now"** on the same product twice
2. **Expected**: Both times show confirmation
3. **Verify**: Cart icon shows **🛒 3**
4. When you open cart, that item should show quantity **x2**

### Step 3: View Shopping Cart

1. Click the **🛒** cart icon (top-right)
2. **Expected**: Modal opens showing all items
3. **Verify Items Display**:
   - Product name
   - Unit price (₹)
   - Quantity controls (− and +)
   - Item subtotal
   - Remove button

### Step 4: Modify Cart Quantities

1. With cart open, click **+** next to an item
2. **Expected**: Quantity increases (e.g., 1 → 2)
3. **Verify**: Item subtotal updates
4. Click **−** to decrease
5. **Verify**: Quantity decreases, subtotal updates

### Step 5: Remove Items

1. Click **"Remove"** button on any item
2. **Expected**: Item disappears from cart
3. **Verify**: Cart count decreases
4. Total and subtotal recalculate

### Step 6: View Cart Summary

1. With items in cart, check the summary section:
   - **Subtotal**: Sum of all (quantity × price)
   - **Delivery/Installation**: ₹500
   - **Total**: Subtotal + Delivery

2. **Expected Values**:
   - If cart has: 1× C.R.I Pumps (₹25,000) + 1× TEXMO Panel (₹3,800)
   - Subtotal: ₹28,800
   - Delivery: ₹500
   - Total: ₹29,300

### Step 7: Test Checkout

1. Click **"Proceed to Payment"** without filling name/phone
2. **Expected**: Alert saying "Please enter your name."
3. Enter name: "John Doe"
4. **Expected**: Alert saying "Please enter your phone number."
5. Enter phone: "9876543210" (10 digits)
6. Click **"Proceed to Payment"**
7. **Expected**: 
   - WhatsApp opens in new tab
   - Message shows all items with prices
   - Total amount is calculated
   - Customer's name and phone are included

### Step 8: Test Edge Cases

#### Empty Name
- Try with name shorter than 3 characters
- **Expected**: "Please enter a valid name (at least 3 characters)."

#### Invalid Phone
- Try with phone like "12345" (less than 10 digits)
- **Expected**: "Please enter a valid 10-digit phone number."
- Try with letters in phone
- **Expected**: Should extract only digits and validate

#### Continue Shopping
1. With cart open, click **"Continue Shopping"**
2. **Expected**: Cart modal closes, page scrollable again
3. Verify cart count still shows items

### Step 9: Test Mobile Responsiveness

1. Resize browser to mobile size (375px width)
2. **Verify**:
   - Cart button still visible and clickable
   - Cart modal fits on screen
   - All controls are accessible
   - Text is readable
   - No horizontal scrolling needed

### Step 10: Test Cart Persistence

1. Add items to cart
2. Press F5 to reload page
3. **Expected**: 
   - Cart items are still there (localStorage)
   - Cart count shows same number
   - All items with quantities preserved

---

## Expected Product Prices

### Motors
- C.R.I Pumps: **₹25,000**
- Texmo Taro Pumps: **₹32,000**
- Assembly Pumps: **₹28,000**

### Control Panels
- C.R.I Control Panel: **₹3,500**
- TEXMO Control Panel: **₹3,800**

### Fees
- Delivery/Installation: **₹500**

---

## Testing Checklist

- [ ] Cart icon appears in navigation
- [ ] Buy Now buttons work for all products
- [ ] Cart count updates correctly
- [ ] Cart modal opens/closes
- [ ] Items display with correct prices
- [ ] Quantity controls work
- [ ] Remove button works
- [ ] Cart summary calculates correctly
- [ ] Checkout validation works
- [ ] WhatsApp message format is correct
- [ ] Mobile responsive design works
- [ ] Cart persists after page reload

---

## Troubleshooting

### Cart Icon Not Showing
- Hard refresh: Press **Ctrl+Shift+R**
- Clear browser cache
- Check browser console (F12) for errors

### Items Not Adding to Cart
- Check browser console for JavaScript errors
- Verify `addToCart()` function is defined
- Make sure onclick attributes have correct syntax

### WhatsApp Link Not Opening
- Check if WhatsApp Web is available
- Verify phone number is correct (919494751475)
- Check message encoding (should be URL encoded)

### Cart Clearing on Reload
- Older browsers might not support localStorage
- Try a different browser
- Check browser's local storage is enabled

---

## What's Next?

Once testing is complete:
1. ✅ Deploy to Netlify
2. ✅ Test on live URL
3. ✅ Share with customers
4. ✅ Monitor WhatsApp orders
5. ✅ Process payments and arrange delivery

---

Generated: Shopping Cart System v1.0
Last Updated: January 2026
