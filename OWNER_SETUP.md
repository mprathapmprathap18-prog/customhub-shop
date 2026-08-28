# 🎯 Owner Dashboard - Setup & Testing Guide

## ✨ What's New
Your toy shop now has a dedicated **Owner Dashboard** where the shop owner can:
- 📊 View business statistics and sales
- 📦 Manage all customer orders
- 🛍️ Manage products
- 👥 View customer information
- 📈 Track order status and analytics

---

## 🚀 How to Set Up Owner Account

### Step 1: Create Owner Account (Automatic)

Run this command in your project root:

```bash
node backend/scripts/createOwner.js
```

**Output:**
```
✅ Owner account created successfully!
📧 Email: kaaviyaselvan@customhubgifts.com
🔐 Password: Owner@123456

⚠️  IMPORTANT: Change the password after first login!
💡 Owner Dashboard: http://localhost:3000/owner/dashboard
```

### Step 2: Login as Owner

1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - **Email:** `kaaviyaselvan@customhubgifts.com`
   - **Password:** `Owner@123456`
3. Click Login

### Step 3: Access Owner Dashboard

After login, you'll see "Owner Dashboard" in the dropdown menu:

1. Click your profile dropdown (top right)
2. Select "Owner Dashboard"
3. You'll be taken to `/owner/dashboard`

---

## 📊 Owner Dashboard Features

### Main Dashboard (`/owner/dashboard`)
Shows:
- **Total Sales** - Total revenue from all orders
- **Total Orders** - Number of customer orders received
- **Products** - Count of products in system
- **Customers** - Total registered customers
- **Order Status Chart** - Visual breakdown of order statuses
- **Recent Orders** - Last 10 orders received

### Orders Management (`/owner/orders`)
- View all customer orders
- Filter by status: Processing, Shipped, Delivered
- Update order status directly from dropdown
- Click "View" to see order details
- See customer email and order amount

### Order Details (`/owner/order/:id`)
- Customer information (name, email)
- Shipping address
- Order items with images
- Order status with timeline
- Total amount
- Update order status

### Products Management (`/owner/products`)
- View all products in catalog
- Click "Add New Product" to create product
- See product price and stock status
- Edit or view individual products
- Quick access to product pages

---

## 🔐 Owner Access Control

**Only users with `role: "owner"` can access:**
- `/owner/dashboard`
- `/owner/orders`
- `/owner/order/:id`
- `/owner/products`

**Backend API Protection:**
- All owner endpoints require `role: "owner"`
- If non-owner tries to access → 403 Forbidden
- If not logged in → Redirected to `/login`

---

## 🔄 Order Status Workflow

Owner can update orders through this flow:

```
Processing → Shipped → Delivered
```

**Actions:**
1. When customer places order → Status: "Processing"
2. Owner marks as "Shipped" → `shippedAt` timestamp recorded
3. Owner marks as "Delivered" → `deliveredAt` timestamp recorded

---

## 📝 Owner Profile

Access owner profile info:
1. Click dropdown menu (top right)
2. Select "My Profile"
3. View and edit profile details

---

## 🛠️ Customization

### Change Owner Contact Info
Edit `backend/config/shopConfig.js`:

```javascript
owner: {
    name: "Your Name",
    email: "your-email@toyshop.com",
    phone: "+91 XXXXXXXXXX",
}
```

### Change Default Owner Credentials
Edit `backend/scripts/createOwner.js`:

```javascript
const ownerEmail = 'your-email@toyshop.com';
const ownerPassword = 'YourPassword123';
```

---

## ✅ Testing Checklist

- [ ] Create owner account using script
- [ ] Login with owner credentials
- [ ] View owner dashboard
- [ ] See dashboard statistics
- [ ] Click on "Orders" to view all orders
- [ ] Try filtering orders by status
- [ ] Click "View" on an order to see details
- [ ] Update order status and verify change
- [ ] View products management
- [ ] Try accessing owner routes from browser URL bar
- [ ] Verify non-owner users cannot access owner routes

---

## 🚨 Common Issues

**Issue: "Something went wrong" when logging in**
- Solution: Make sure the script ran successfully
- Check that MongoDB is connected
- Verify owner account was created in database

**Issue: "Access Denied" when accessing owner dashboard**
- Solution: Make sure you're logged in as owner (role: "owner")
- Try logging out and logging back in

**Issue: Orders not showing**
- Solution: Place some orders as a customer first
- Orders will automatically appear in owner dashboard

---

## 📱 Mobile Responsive

Owner dashboard is fully responsive:
- ✅ Desktop view with full stats and charts
- ✅ Tablet view with adjusted layout
- ✅ Mobile view with stacked components

---

## 🎉 You're All Set!

Your owner dashboard is ready to use. Start managing your toy shop business! 

**Next Steps:**
1. Create owner account
2. Place some test orders as customer
3. View and manage orders from owner dashboard
4. Update order statuses
5. Customize shop information
