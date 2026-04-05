import home from "@/assets/icons/home.png";
import order from "@/assets/icons/restaurant.png";
import search from "@/assets/icons/search.png";
import profile from "@/assets/icons/user.png";

export const icons = {
    home,
    search,
    order,
    profile
} as const;

export type IconKey = keyof typeof icons;