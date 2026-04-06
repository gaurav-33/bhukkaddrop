import { Pressable, Text, View } from "react-native";

type Props = {
    offer: Offer;
    onPress?: () => void;
};

export function OfferCard({ offer, onPress }: Props) {
    return (
        <Pressable className="bg-card h-44 w-32 border border-border rounded-2xl p-3 mr-3 items-center justify-between" onPress={onPress}>
            <View className="items-center">
                <Text className="text-4xl mb-2">{offer.icon}</Text>
                <Text className="font-sans-semibold text-xs text-foreground text-center mb-0.5" numberOfLines={1}>
                    {offer.label}
                </Text>
                <Text className="font-sans-regular text-[10px] text-muted-foreground text-center mb-2" numberOfLines={1}>
                    {offer.restaurant}
                </Text>
            </View>
            <View
                className="self-stretch items-center py-0.5 rounded-full"
                style={{ backgroundColor: offer.tagColor }}
            >
                <Text className="font-sans-bold text-[10px] text-white text-center">{offer.tag}</Text>
            </View>
        </Pressable>
    );
}
