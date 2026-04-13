import { View, Text, Pressable } from 'react-native'
import React from 'react'

type Props = {
    title: string;
    onPress?: () => void
};

const SectionHeader = ({ title, onPress }: Props) => {
    return (
        <View className="flex-row items-center justify-between mb-4">
            <Text className="font-heading-semibold text-lg text-foreground">{title}</Text>
            {onPress && <Pressable>
                <Text className="font-sans-medium text-sm text-primary border border-border py-1 px-3 rounded-4xl">See all</Text>
            </Pressable>}
        </View>

    )
}

export default SectionHeader