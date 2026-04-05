import { styled } from "nativewind";
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView as RNSafeView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeView);

const Search = () => {
    return (
        <SafeAreaView className="safe-view">
            <Text>Search</Text>
        </SafeAreaView>
    )
}

export default Search