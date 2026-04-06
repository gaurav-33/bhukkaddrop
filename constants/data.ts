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
    }
];
