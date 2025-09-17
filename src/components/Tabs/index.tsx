import { PlatformColor, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { THEME, useTheme } from "@/src/theme";

type props = {
  children?: ReactNode;
};

export const Tabs: React.FC<props> = ({ children }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 1000,
      left: 0,
      bottom: 0,
      width: "100%",
      height: 60,
      backgroundColor: THEME.palette[theme].color.primary,
    },
    tabs: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>{children}</View>
    </View>
  );
};
