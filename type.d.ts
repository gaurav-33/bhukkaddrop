import type { ImageSourcePropType } from "react-native";

declare global {
    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType
    }
    interface AppTab {
        name: string,
        title: string,
        icon: ImageSourcePropType
    }
    interface Promo {
        id: string;
        badge: string;
        title: string;
        subtitle: string;
        cta: string;
        imageUri: string;
    }
    interface Offer {
        id: string;
        icon: string;       // emoji
        label: string;
        tag: string;        // e.g. "50% OFF"
        tagColor: string;   // hex
        restaurant: string;
    }
    interface Category {
        id: string;
        alias: string;
        imageUri: string;
    }
    interface Restaurant {
        id: string;
        name: string;
        rating: string;
        ratingCount: string;
        distance: string;
        location: string;
        tags: string;
        priceForTwo: string;
        imageUri: string;
        badgeType?: 'veg' | 'bolt' | null;
        offerTitle: string;
        offerSubtitle: string;
        deliveryTime: string;
        isAd?: boolean;
        menuCategories?: { id: string; title: string; count: number }[];
    }
    interface MenuItem {
        id: string;
        name: string;
        price: number;
        originalPrice?: number;
        rating?: number;
        ratingCount?: number;
        description?: string;
        isVeg: boolean;
        isBestseller?: boolean;
        imageUri?: string;
    }
    interface OrderItem {
        id: string;
        name: string;
        quantity: number;
        price: number;
        isVeg: boolean;
    }
    interface Order {
        id: string;
        restaurantName: string;
        location: string;
        imageUri: string;
        status: string;         // 'Delivered', 'On the way', etc.
        statusColor?: string;   // hex code
        items: OrderItem[];
        date: string;
        billTotal: number;
        isCurrent?: boolean;    // Used to separate active vs past
        foodRating?: number;
        deliveryRating?: number;
    }
}

export { };
