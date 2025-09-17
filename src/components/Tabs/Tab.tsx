import { PlatformColor, Pressable, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { NavigationProp } from "@react-navigation/native";

type props = {
  navigation: NavigationProp<{}>;
  route: string;
  children: ReactNode;
};

export const Tab: React.FC<props> = ({ navigation, route, children }) => {
  return (
    <Pressable onPress={() => navigation?.navigate(route as never)}>
      {children}
    </Pressable>
  );
};
