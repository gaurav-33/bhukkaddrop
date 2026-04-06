import React from 'react'
import { Text, View } from 'react-native'

const FooterCredit = () => {
  return (
    <View className="flex-col items-start justify-start py-5">
      <Text className="text-5xl font-heading-bold text-muted-foreground tracking-tight leading-none">
        Never Sleep
      </Text>
      <Text className="text-5xl font-heading-bold text-foreground tracking-tight leading-none">
        Hungry.
      </Text>

      <Text className="text-xs font-sans-medium text-foreground mt-2 tracking-wide">
        Made with ❤️ in Hostel
      </Text>
    </View>
  )
}

export default FooterCredit