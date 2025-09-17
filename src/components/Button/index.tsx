import { Pressable, StyleSheet, View } from "react-native";
import { THEME, useTheme } from "@/src/theme";
import { ReactNode } from "react";
import { Text } from "../Text";

type props = {
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  children: ReactNode | string;
};

export const Button: React.FC<props> = ({
  onPress,
  disabled,
  style,
  children,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      padding: THEME.styles.spacing.sm,
      borderRadius: 5,
      backgroundColor: THEME.palette[theme].color.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: THEME.palette[theme].color.text,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{ ...styles.button, ...style }}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
};
