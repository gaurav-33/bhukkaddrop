import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    name: string;
    outlet?: string | null;
    location?: string | null;
}

const FooterDesclaimer = ({ name, outlet, location }: Props) => {
    return (
        <View className="mt-6">
            {/* Disclaimer Section */}
            <Text className="text-md font-sans-bold text-muted-foreground mb-2">Disclaimer:</Text>
            <View className="mb-4 px-2">
                <Text className="text-sm font-sans-regular text-foreground/60 mb-1">All item prices are set directly by the partner cafes, not by BhukkadDrop.</Text>
                <Text className="text-sm font-sans-regular text-foreground/60 mb-1">Portions, food quality, and packaging are managed entirely by the restaurant.</Text>
                <Text className="text-sm font-sans-regular text-foreground/60">Item images are for representation purposes and may vary from the actual dish.</Text>
            </View>

            <View className="h-px bg-muted w-full mb-4" />

            {/* FSSAI Section */}
            <View className="flex-row items-center mb-4">
                {/* You can use an FSSAI image/icon here */}
                <Text className="text-xs font-sans-regular text-foreground/60">FSSAI License No. 12345678901234</Text>
            </View>

            <View className="h-px bg-muted w-full mb-4" />

            {/* Address Section */}
            <Text className="text-sm font-bold text-foreground mb-1">{name}</Text>
            {outlet && <Text className="text-xs text-muted-foreground mb-2">(Outlet:{outlet})</Text>}
            {location && <Text className="text-xs text-muted-foreground leading-tight">
                📍 {location}
            </Text>}
        </View>
    )
}

export default FooterDesclaimer