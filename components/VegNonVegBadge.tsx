import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    isVeg: boolean;
}

const VegNonVegBadge = ({ isVeg }: Props) => {
    return (
        <View className="flex-row items-center">
            {isVeg ? (
                <View className="size-3.5 border border-success items-center justify-center rounded-sm">
                    <View className="size-1.5 bg-success rounded-full" />
                </View>
            ) : (
                <View className="size-3.5 border border-destructive items-center justify-center rounded-sm pb-px">
                    <View className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-destructive" />
                </View>
            )}

        </View>
    )
}

export default VegNonVegBadge