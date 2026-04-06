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
    interface Offer{
        id: string;
        icon: string;       // emoji
        label: string;
        tag: string;        // e.g. "50% OFF"
        tagColor: string;   // hex
        restaurant: string;
    }
}

export { };