# 🌸 Sree Ethnic Finds — Boutique E-Commerce Website & Admin Console

> **Trendy, Affordable College-Wear Kurtis for Indian Women (₹299 - ₹499)**  
> Curated and shipped from **Chalakuzhy, Medical College, Thiruvananthapuram, Kerala, India**  
> Phone / WhatsApp: **+91 70128 97623** | Email: **sreeroopa07122006@gmail.com**  
> Built with **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌟 1. Project Overview & Boutique Concept

**Sree Ethnic Finds** is a chic, Pinterest-inspired fashion boutique tailored for young Indian women and college students. The brand solves a common problem: college girls want comfortable, breathable, and modern ethnic kurtis to pair with blue jeans or wear to daily lectures without spending thousands of rupees.

- **Target Audience:** Indian college students & young women.
- **Price Range:** Everyday pocket-money prices between **₹299 and ₹499**.
- **Studio Location:** Chalakuzhy, Medical College, Thiruvananthapuram, Kerala.
- **Order Fulfillment:** Direct boutique curation, quality inspection, and dispatch straight to college dorms and student homes across India.
- **Admin Publishing:** Dedicated interactive admin console where the owner can upload new kurti photos from phone/PC, set sizes and prices, record direct WhatsApp/phone orders, and track courier dispatches.

---

## 🎨 2. Design Aesthetic & Palette

The website is crafted with a soft, romantic, Pinterest-inspired pastel aesthetic:
- **Pastel Pink Palette:** `#FFF5F7`, `#FFE6EC`, `#FAD2E1`, `#EE7B99`
- **Warm Creams & Sand:** `#FFFDF9`, `#FAF6F0`, `#F5EBE0`, `#D5BDAF`
- **Deep Wine & Terracotta Accents:** `#892B42`, `#561026`
- **Typography:** *Playfair Display* (Editorial boutique serif) paired with *Plus Jakarta Sans* (clean modern UI).
- **Interactive Touches:** Glassmorphism (`backdrop-blur-md`), rounded cards, micro-animations, and photography of Indian college students wearing kurtis on campus.

---

## 📁 3. Project Directory Structure

```
sree-ethnic-finds/
├── public/
│   └── images/                     # Curated kurti photography
│       ├── hero.jpg                # Campus hero model shot
│       ├── floral_straight.jpg     # Gulabi Bahaar straight kurti
│       ├── pastel_mint.jpg         # Noor mint cotton & lace kurti
│       ├── short_indigo.jpg        # Aura short kurti for jeans
│       ├── minimal_peach.jpg       # Kashvi minimal daily kurti
│       ├── ethnic_lavender.jpg     # Aafreen flared tiered kurti
│       └── promo_wardrobe.jpg      # College wardrobe lookbook banner
├── src/
│   ├── main.jsx                    # React entrypoint
│   ├── App.jsx                     # Core application orchestrator
│   ├── index.css                   # Tailwind directives & boutique styling system
│   ├── context/
│   │   └── StoreContext.jsx        # State manager (Cart, Wishlist, Orders, Admin Console)
│   ├── data/
│   │   ├── products.js             # Curated ₹300-₹500 kurti catalog & size charts
│   │   └── testimonials.js         # Verified Trivandrum student reviews
│   └── components/
│       ├── AnnouncementBar.jsx     # Top marquee ticker with student discounts
│       ├── Navbar.jsx              # Responsive navigation, search, wishlist & cart
│       ├── Hero.jsx                # Campus curated headline & CTAs
│       ├── CategoryPills.jsx       # Category selectors, price sliders, & size filter
│       ├── ProductCard.jsx         # Boutique product cards with ₹ prices & quick add
│       ├── ProductCatalog.jsx      # Responsive grid with filtering & sorting
│       ├── ProductModal.jsx        # Gallery, fabric specs, delivery date & pincode estimator
│       ├── SizeGuideModal.jsx      # Indian standard size chart (XS - XXL)
│       ├── CartDrawer.jsx          # Slide-out bag with free shipping progress & coupon
│       ├── CheckoutModal.jsx       # Indian address form, COD/UPI modes, receipt printer
│       ├── PromoBanner.jsx         # "Your College Wardrobe, Reimagined" feature
│       ├── AboutUs.jsx             # Story, direct contact & location details
│       ├── Testimonials.jsx        # Campus reviews from Trivandrum colleges
│       ├── Newsletter.jsx          # Student style club 15% discount signup
│       ├── WishlistDrawer.jsx      # Slide-out saved kurtis
│       ├── AdminDashboard.jsx      # Admin publishing console (Kurti photo upload, manual orders, AWB dispatch)
│       ├── WhatsAppFloatingButton.jsx # Instant styling/order assistance (+91 70128 97623)
│       ├── Footer.jsx              # Boutique address, student helpline & policies
│       └── Toast.jsx               # Floating micro-notifications
├── server/
│   ├── server.js                   # Express.js REST API & static server
│   ├── config/
│   │   └── db.js                   # MongoDB connection with resilient in-memory fallback
│   ├── models/
│   │   ├── Product.js              # Product schema
│   │   └── Order.js                # Order schema with courier dispatch tracking
│   └── routes/
│       ├── productRoutes.js        # GET, POST, PUT, DELETE product catalog endpoints
│       └── orderRoutes.js          # Customer checkout & order management endpoints
├── package.json                    # NPM dependencies & scripts
├── vite.config.js                  # Vite configuration with API proxy to port 5000
└── tailwind.config.js              # Custom pastel design tokens & fonts
```

---

## 🚀 4. How to Run Locally in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
- [VS Code](https://code.visualstudio.com/) installed.

### Step-by-Step Instructions

1. **Open the project folder in VS Code:**
   ```bash
   cd "c:\Users\User\sree ethinic finds"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Website (Frontend + Backend):**
   ```bash
   npm start
   ```

   *Alternatively, run them in separate terminal tabs:*
   - **Terminal 1 (Backend API):**
     ```bash
     npm run server
     ```
     *Server runs on:* `http://localhost:5000`
   - **Terminal 2 (Frontend Client):**
     ```bash
     npm run dev
     ```
     *Frontend runs on:* `http://localhost:3000`

4. **Open your browser and visit:**
   ```
   http://localhost:3000/
   ```

---

## 👤 5. Boutique Profile & Store Manager

To access the boutique store manager:
1. Click the **"Profile"** button in the top navbar or footer.
2. Enter your boutique management password in the secure login modal.
3. The dashboard features 6 management areas:
   - 📸 **Publish New Kurti:** Choose image files directly from your computer or phone (instant image preview), define kurti name, category, price (₹), MRP (₹), interactive size selection toggles (`XS`, `S`, `M`, `L`, `XL`, `XXL`), fabric description, and stock quantity.
   - 📝 **Publish / Record Order:** Manually log customer orders received via WhatsApp or phone (+91 70128 97623) with customer details, address, kurti selected, size, and payment method.
   - 📦 **Orders & Shipping:** View all customer orders, assign courier partners (India Post Speed Post, Delhivery, BlueDart, DTDC), generate AWB tracking codes, and update delivery statuses.
   - 🛍️ **Live Catalog Manager:** View current inventory, modify prices and sizes, or delete out-of-stock items.
   - 📊 **Sales & Revenue:** Live analytics showing total revenue generated, order volume, and delivered orders.
   - 👤 **Boutique Profile:** Studio details, Chalakuzhy address, verified boutique badge, customer WhatsApp link, and courier dispatch settings.

---

## 🎟️ 6. Student Promo Codes for Testing

Test these coupons during checkout:
- **`COLLEGE10`**: Applies **10% Student Discount** to any bag total.
- **`CAMPUS50`**: Applies **Flat ₹50 OFF** on first order.

---

## 📍 7. Boutique Contact & Location

- **Boutique Name:** Sree Ethnic Finds
- **Address:** Chalakuzhy, Medical College, Thiruvananthapuram, Kerala, India
- **Phone / WhatsApp:** +91 70128 97623
- **Email:** sreeroopa07122006@gmail.com
