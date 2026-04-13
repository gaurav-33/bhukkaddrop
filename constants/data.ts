import { icons } from "@/constants/icons";

export const tabs: AppTab[] = [
    { name: 'index', title: 'Home', icon: icons.home },
    { name: 'search', title: 'Search', icon: icons.search },
    { name: 'orders', title: 'Orders', icon: icons.order },
    { name: 'profile', title: 'Profile', icon: icons.profile },
];



// ── Dummy Promo Data ─────────────────────────────────────────────────────────

export const PROMOS: Promo[] = [
    {
        id: 'p1',
        badge: 'Flash Deal',
        title: 'Maggi at ₹20',
        subtitle: 'Midnight cravings sorted at Night Canteen.',
        cta: 'Order Now',
        imageUri: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
    },
    {
        id: 'p2',
        badge: 'Limited Offer',
        title: 'Thali for ₹49',
        subtitle: 'Full meal deal at Mess Block. Today only!',
        cta: 'Grab It',
        imageUri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
    },
    {
        id: 'p3',
        badge: 'New Drop',
        title: 'Cold Coffee ₹30',
        subtitle: 'Beat the heat at Café Corner.',
        cta: 'Try Now',
        imageUri: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    },
];

// ── Dummy Offer Data ─────────────────────────────────────────────────────────

export const offers: Offer[] = [
    {
        id: 'o1',
        icon: '🍕',
        label: 'Pizza Corner',
        tag: '40% OFF',
        tagColor: '#DC2626',
        restaurant: 'The Pizza Hub',
    },
    {
        id: 'o2',
        icon: '🍔',
        label: 'Burger Bliss',
        tag: 'Buy 1 Get 1',
        tagColor: '#FF7043',
        restaurant: 'Burger Street',
    },
    {
        id: 'o3',
        icon: '🥗',
        label: 'Healthy Eats',
        tag: 'Free Drink',
        tagColor: '#16A34A',
        restaurant: 'Green Bowl Co.',
    },
    {
        id: 'o4',
        icon: '🍜',
        label: 'Noodle House',
        tag: '30% OFF',
        tagColor: '#DC2626',
        restaurant: 'Wok & Roll',
    },
    {
        id: 'o5',
        icon: '🍩',
        label: 'Sweet Spot',
        tag: 'Free Dessert',
        tagColor: '#FF9D42',
        restaurant: 'Sugar Rush',
    },
];

export const CATEGORIES: Category[] = [
    { id: 'c1', alias: 'North Indian', imageUri: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80' },
    { id: 'c2', alias: 'Burgers', imageUri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
    { id: 'c3', alias: 'Pizzas', imageUri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' },
    { id: 'c4', alias: 'Biryani', imageUri: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&q=80' },
    { id: 'c5', alias: 'Rolls', imageUri: 'https://images.unsplash.com/photo-1607278967323-8766a3a501e6?w=200&q=80' },
];

export const FILTERS = [
    { id: 'f1', label: 'Filter', icon: 'options-outline' },
    { id: 'f2', label: 'Sort by', icon: 'chevron-down' },
    { id: 'f3', label: 'Extra off' },
    { id: 'f4', label: '99 Store' },
];


export const RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'Vadilal Ice Creams',
        rating: '4.6',
        ratingCount: '(83)',
        location: 'Bihta',
        distance: '5.0 km',
        tags: 'Ice Cream, Desserts',
        priceForTwo: '₹300 for two',
        imageUri: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800&q=80',
        badgeType: 'veg',
        offerTitle: '20% off upto ₹50',
        offerSubtitle: '11% extra off',
        deliveryTime: '20-25 MINS',
        isAd: true,
        menuCategories: [
            { id: 'mc1', title: 'Top Picks', count: 2 },
            { id: 'mc2', title: 'Recommendation', count: 3 },
            { id: 'mc3', title: 'Super Saver Trio', count: 4 },
            { id: 'mc4', title: 'Ice Creams', count: 12 },
            { id: 'mc5', title: 'Desserts', count: 8 }
        ]
    },
    {
        id: 'r2',
        name: 'Burger Bliss',
        rating: '4.2',
        ratingCount: '(1k+)',
        location: 'Danapur',
        distance: '3.2 km',
        tags: 'Burgers, American',
        priceForTwo: '₹200 for two',
        imageUri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
        badgeType: 'bolt',
        offerTitle: 'Flat ₹50 off',
        offerSubtitle: 'Above ₹149',
        deliveryTime: '15-20 MINS',
        isAd: false,
        menuCategories: [
            { id: 'mc1', title: 'Bestsellers', count: 5 },
            { id: 'mc2', title: 'Burgers', count: 10 },
            { id: 'mc3', title: 'Beverages', count: 6 },
        ]
    },
    {
        id: 'r3',
        name: 'Spicy Delight',
        rating: '4.5',
        ratingCount: '(500+)',
        location: 'Main Road',
        distance: '2.1 km',
        tags: 'North Indian, Mughlai',
        priceForTwo: '₹400 for two',
        imageUri: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80',
        badgeType: null,
        offerTitle: 'Buy 1 Get 1',
        offerSubtitle: 'On selected items',
        deliveryTime: '25-30 MINS',
        menuCategories: [
            { id: 'mc1', title: 'Top Picks', count: 3 },
            { id: 'mc2', title: 'Mains', count: 15 },
            { id: 'mc3', title: 'Breads', count: 8 },
        ]
    }
];

// ── Dummy Menu Data ─────────────────────────────────────────────────────────

export const TOP_PICKS: MenuItem[] = [
    {
        id: 'tp1',
        name: 'Chi. tikka',
        price: 349,
        isVeg: false,
        imageUri: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        id: 'tp2',
        name: 'Paneer butter masala',
        price: 269,
        originalPrice: 200,
        isVeg: true,
        isBestseller: true,
        imageUri: 'https://images.unsplash.com/photo-1772730064951-89b427965dbc?w=600&q=80'
    }
];

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 'm1',
        name: 'Cassata Ice Cream Cake [500 Ml]',
        price: 340,
        originalPrice: 303,
        rating: 4.8,
        ratingCount: 5,
        isVeg: true,
        isBestseller: true,
        description: 'A hearty cheesy chicken combo paired with flavorful Korean rice, a crispy taco, and a refreshing coke. Best enjoyed with friends.',
        imageUri: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80'
    },
    {
        id: 'm2',
        name: 'Crunchy Butterscotch Gourmet- Ice Cream Tub',
        price: 200,
        originalPrice: 178,
        isVeg: true,
        isBestseller: true,
        description: 'A creamy cheesy chicken feast paired with flavorful Korean rice, choco lava cake, and a coke. Absolutely irresistible!',
        imageUri: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80'
    },
    {
        id: 'm3',
        name: 'Chocolate Lava Cake',
        price: 150,
        isVeg: true,
        imageUri: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80'
    }
];

// ── Dummy Order Data ─────────────────────────────────────────────────────────

export const CURRENT_ORDERS: Order[] = [
    {
        id: 'ord1',
        restaurantName: 'Burger Bliss',
        location: 'Danapur',
        imageUri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=80',
        status: 'On the way',
        statusColor: '#F97316', // Orange
        items: [
            { id: 'i1', name: 'Zinger Burger', quantity: 2, price: 180, isVeg: false },
            { id: 'i2', name: 'Peri Peri Fries', quantity: 1, price: 90, isVeg: true }
        ],
        date: 'Today, 7:15 PM',
        billTotal: 450,
        isCurrent: true
    }
];

export const PAST_ORDERS: Order[] = [
    {
        id: 'ord2',
        restaurantName: 'Vrindavan Bhog',
        location: 'Bihta',
        imageUri: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=200&q=80',
        status: 'Delivered',
        statusColor: '#16A34A', // Green
        items: [
            { id: 'i1', name: 'Pav Bhaji', quantity: 1, price: 50, isVeg: true },
            { id: 'i2', name: 'Samosa Chaat', quantity: 1, price: 27, isVeg: true }
        ],
        date: 'October 16, 6:32 PM',
        billTotal: 77,
        foodRating: 0,
        deliveryRating: 0
    },
    {
        id: 'ord3',
        restaurantName: 'Bihta Sone Hotel',
        location: 'Bihta',
        imageUri: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80',
        status: 'Delivered',
        statusColor: '#16A34A',
        items: [
            { id: 'i1', name: 'Roti', quantity: 4, price: 10, isVeg: true },
            { id: 'i2', name: 'Matar paneer', quantity: 1, price: 191, isVeg: true }
        ],
        date: 'March 29, 3:04 PM',
        billTotal: 231,
        foodRating: 0,
        deliveryRating: 0
    },
    {
        id: 'ord4',
        restaurantName: 'Vrindavan Bhog',
        location: 'Bihta',
        imageUri: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=200&q=80',
        status: 'Delivered',
        statusColor: '#16A34A',
        items: [
            { id: 'i1', name: 'Samosa [1 Piece]', quantity: 1, price: 20, isVeg: true },
            { id: 'i2', name: 'Dahi Bhalla Chaat', quantity: 1, price: 40, isVeg: true },
            { id: 'i3', name: 'Gulab Jamun', quantity: 2, price: 20, isVeg: true },
            { id: 'i4', name: 'Coke', quantity: 1, price: 55, isVeg: true }
        ],
        date: 'March 15, 8:00 PM',
        billTotal: 155,
        foodRating: 4,
        deliveryRating: 5
    }
];
