import { THEME, useTheme } from "@/src/theme";
import { StyleSheet, Text as TextLib } from "react-native";

interface props {
  style?: any;
  children: any;
}

export const Text = ({ style, children }: props) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    text: {
      color: THEME.palette[theme].color.text,
    },
  });

  return <TextLib style={{ ...styles.text, ...style }}>{children}</TextLib>;
};
