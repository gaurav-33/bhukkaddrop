import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView as RNSafeView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeView);


const Profile = () => {
    return (
        <SafeAreaView className='safe-view'>
            <Text>Profile</Text>
        </SafeAreaView>
    )
}

export default Profile