import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Initial sample orders for Sree Ethnic Finds boutique
const INITIAL_SAMPLE_ORDERS = [
  {
    orderId: "SEF-2026-1042",
    createdAt: "2026-10-21T10:30:00Z",
    customer: {
      name: "Sneha Nair",
      phone: "9876543210",
      email: "sneha.nair@kerala.ac.in",
      address: "Ladies Hostel, Medical College Campus",
      city: "Thiruvananthapuram",
      state: "Kerala",
      pincode: "695011"
    },
    items: [
      {
        id: "sef-001",
        name: "Gulabi Bahaar Floral Straight Kurti",
        size: "M",
        color: "Pastel Pink",
        price: 399,
        quantity: 1,
        image: "/images/floral_straight.jpg"
      }
    ],
    subtotal: 399,
    deliveryFee: 49,
    discount: 0,
    totalAmount: 448,
    paymentMethod: "Cash on Delivery (COD) [Demo]",
    status: "Confirmed",
    trackingCourier: "India Post Speed Post",
    trackingAwb: "KL-TRV-77829104",
    notes: "Leave with hostel security guard if not available."
  },
  {
    orderId: "SEF-2026-1038",
    createdAt: "2026-10-20T16:45:00Z",
    customer: {
      name: "Gopika Menon",
      phone: "7012897623",
      email: "gopika.m@gmail.com",
      address: "House No 14, Chalakuzhy Road, Medical College P.O.",
      city: "Thiruvananthapuram",
      state: "Kerala",
      pincode: "695011"
    },
    items: [
      {
        id: "sef-003",
        name: "Aura Indigo Short Kurti for Jeans",
        size: "S",
        color: "Indigo Blue",
        price: 349,
        quantity: 2,
        image: "/images/short_indigo.jpg"
      }
    ],
    subtotal: 698,
    deliveryFee: 0,
    discount: 50,
    totalAmount: 648,
    paymentMethod: "UPI Demo Payment",
    status: "Shipped",
    trackingCourier: "Delhivery Air",
    trackingAwb: "DLHV-99214532",
    notes: ""
  }
];

export const StoreProvider = ({ children }) => {
  // Products state (persisted in localStorage or fetched from API)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sef_products_v2');
    return saved ? JSON.parse(saved) : SAMPLE_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sef_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sef_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Active product modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Size guide modal
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Checkout modal & last order
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Admin Dashboard & Auth
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('sef_admin_token') === 'authenticated';
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sef_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Styles');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('');
  const [priceRange, setPriceRange] = useState([300, 500]);
  const [sortBy, setSortBy] = useState('featured');

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('sef_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sef_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sef_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sef_orders_v2', JSON.stringify(orders));
  }, [orders]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, size, color, quantity = 1) => {
    const itemKey = `${product.id}-${size}-${color.name || color}`;
    const existingIndex = cart.findIndex(item => item.itemKey === itemKey);

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...cart,
        {
          itemKey,
          product,
          size,
          color: typeof color === 'string' ? color : color.name,
          colorHex: typeof color === 'object' ? color.hex : '#FAD2E1',
          quantity,
          addedAt: new Date().toISOString()
        }
      ];
    }
    setCart(updatedCart);
    showToast(`Added "${product.name}" (${size}) to your bag!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    const updated = cart.filter(item => item.itemKey !== itemKey);
    setCart(updated);
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    const updated = cart.map(item => {
      if (item.itemKey === itemKey) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updated);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Computed totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 499 ? 0 : 49;
  const couponDiscount = appliedCoupon ? (appliedCoupon.type === 'percentage' ? Math.round((cartSubtotal * appliedCoupon.value) / 100) : appliedCoupon.value) : 0;
  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Apply Coupon
  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'COLLEGE10') {
      setAppliedCoupon({ code: 'COLLEGE10', value: 10, type: 'percentage', label: '10% Student Discount' });
      showToast('🎉 COLLEGE10 applied! 10% discount added.');
      return { success: true, message: '10% student discount applied!' };
    } else if (cleanCode === 'CAMPUS50') {
      setAppliedCoupon({ code: 'CAMPUS50', value: 50, type: 'flat', label: '₹50 Off First Order' });
      showToast('🎉 CAMPUS50 applied! Flat ₹50 off.');
      return { success: true, message: 'Flat ₹50 discount applied!' };
    } else {
      showToast('Invalid coupon code. Try COLLEGE10', 'error');
      return { success: false, message: 'Invalid code. Use COLLEGE10 or CAMPUS50' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast('Removed from your wishlist.');
    } else {
      setWishlist([...wishlist, product]);
      showToast('Added to your wishlist ❤️');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };

  // Customer Order Placement
  const placeOrder = (customerData, paymentMethod) => {
    const orderId = `SEF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        size: item.size,
        color: item.color,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      discount: couponDiscount,
      totalAmount: cartTotal,
      paymentMethod,
      status: "Confirmed",
      trackingCourier: "Ready for Dispatch from Chalakuzhy",
      trackingAwb: "Pending",
      notes: customerData.deliveryNotes || ""
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${orderId} placed successfully! 🎉`);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    return newOrder;
  };

  // Admin Manual Order Publishing (for WhatsApp, Phone, or In-Person Orders)
  const publishManualOrder = (manualOrderData) => {
    const orderId = manualOrderData.orderId || `SEF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: manualOrderData.customer,
      items: manualOrderData.items,
      subtotal: manualOrderData.subtotal || manualOrderData.totalAmount,
      deliveryFee: manualOrderData.deliveryFee || 0,
      discount: manualOrderData.discount || 0,
      totalAmount: manualOrderData.totalAmount,
      paymentMethod: manualOrderData.paymentMethod || 'Cash on Delivery (COD) [Manual]',
      status: manualOrderData.status || 'Confirmed',
      trackingCourier: manualOrderData.trackingCourier || 'Ready for Dispatch',
      trackingAwb: manualOrderData.trackingAwb || 'Pending',
      notes: manualOrderData.notes || 'Published via Admin Console'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    showToast(`Order #${orderId} published successfully! 🎉`);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    return newOrder;
  };

  // Admin Shipping / Dispatch
  const shipOrder = (orderId, courierName, awbNumber) => {
    const defaultCouriers = ["India Post Speed Post", "Delhivery Air", "BlueDart Express", "DTDC Priority"];
    const courier = courierName || defaultCouriers[Math.floor(Math.random() * defaultCouriers.length)];
    const awb = awbNumber || `TRV-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const updated = orders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: "Shipped",
          trackingCourier: courier,
          trackingAwb: awb
        };
      }
      return order;
    });

    setOrders(updated);
    showToast(`Order ${orderId} marked as Shipped! AWB: ${awb}`);
  };

  const updateOrderStatus = (orderId, newStatus, trackingAwb, trackingCourier) => {
    const updated = orders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: newStatus,
          trackingAwb: trackingAwb !== undefined ? trackingAwb : order.trackingAwb,
          trackingCourier: trackingCourier !== undefined ? trackingCourier : order.trackingCourier
        };
      }
      return order;
    });
    setOrders(updated);
    showToast(`Order ${orderId} updated to "${newStatus}".`);
  };

  // Product CRUD (Publishing, Editing, Deleting)
  const addProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: `sef-${String(products.length + 1).padStart(3, '0')}`,
      reviewsCount: 0,
      rating: 5.0,
      inStock: true,
      dispatchLocation: "Chalakuzhy, Thiruvananthapuram"
    };
    const updated = [productWithId, ...products];
    setProducts(updated);
    showToast(`🎉 Kurti "${productWithId.name}" published to live website!`);
    return productWithId;
  };

  const updateProduct = (updatedProd) => {
    const updated = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    setProducts(updated);
    showToast(`Kurti "${updatedProd.name}" updated!`);
  };

  const deleteProduct = (productId) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    showToast('Kurti removed from catalog.', 'info');
  };

  // Boutique Profile Login
  const loginAdmin = (password) => {
    if (password === 'admin123' || password === 'sree2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('sef_admin_token', 'authenticated');
      showToast('Welcome to your Boutique Profile & Manager');
      return true;
    } else {
      showToast('Incorrect password. Please try again.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('sef_admin_token');
    showToast('Signed out of Boutique Profile.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        isProductModalOpen,
        openProductModal,
        closeProductModal,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        placeOrder,
        publishManualOrder,
        orders,
        shipOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isProfileOpen: isAdminOpen,
        setIsProfileOpen: setIsAdminOpen,
        isProfileLoggedIn: isAdminLoggedIn,
        loginProfile: loginAdmin,
        logoutProfile: logoutAdmin,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSizeFilter,
        setSelectedSizeFilter,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
