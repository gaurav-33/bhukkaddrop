import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView as RNSafeView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeView);

const Orders = () => {
    return (
        <SafeAreaView className='safe-view'>
            <Text>Orders</Text>
        </SafeAreaView>
    )
}

export default Orders