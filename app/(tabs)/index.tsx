import { Text } from "react-native";
import { SafeAreaView as RNSafeView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeView);

export default function App() {
  return (
    <SafeAreaView className="safe-view">
      <Text className="text-5xl font-heading-bold text-foreground">
        Whatsupp, <Text className="text-primary">bhukkad !!!</Text>
      </Text>
    </SafeAreaView>
  );
}