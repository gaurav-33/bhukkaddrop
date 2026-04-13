import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  promo: Promo;
  onPress?: () => void;
};

export function PromoCard({ promo, onPress }: Props) {
  return (
    <Pressable className="relative overflow-hidden rounded-3xl h-44 mr-4 w-75" onPress={onPress}>
      {/* ── Layer 1: full-bleed food image ── */}
      <Image
        source={{ uri: promo.imageUri }}
        resizeMode="cover"
        className="absolute right-0 top-0 bottom-0 w-[65%]"
      />

      {/* ── Layer 2: gradient overlay (card color → transparent) ── */}
      <LinearGradient
        colors={[theme.colors.foreground, theme.colors.mutedForeground, "transparent"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* ── Layer 3: text content ── */}
      <View className="absolute left-0 top-0 bottom-0 justify-center pl-5 pr-2 z-10 w-[62%]">
        <Text className="bg-muted-foreground self-start font-sans-bold text-[10px] text-white py-1 px-3 rounded-full uppercase mb-2 tracking-wider">{promo.badge}</Text>
        <Text className="font-heading-bold text-2xl text-white leading-none mb-1">{promo.title}</Text>
        <Text className="font-sans-regular text-xs text-muted mb-3" numberOfLines={2}>
          {promo.subtitle}
        </Text>
        <Pressable className="self-start bg-white rounded-xl px-4 py-1.5" onPress={onPress}>
          <Text className="font-sans-bold text-xs text-primary">
            {promo.cta}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
