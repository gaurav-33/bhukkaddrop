import { SafeAreaView } from "@/components/SafeAreaWrapper";
import { Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="safe-view">
      <Text className="text-5xl font-heading-bold text-foreground">
        Whatsupp, <Text className="text-primary">bhukkad !!!</Text>
      </Text>
    </SafeAreaView>
  );
}