import home from "@/assets/icons/home.png";
import order from "@/assets/icons/order.png";
import search from "@/assets/icons/search.png";
import profile from "@/assets/icons/user.png";
import location from "@/assets/icons/location.png"
import down from "@/assets/icons/down.png"
import bell from "@/assets/icons/bell.png"

export const icons = {
    home,
    search,
    order,
    profile,
    location,
    down,
    bell,
} as const;

export type IconKey = keyof typeof icons;