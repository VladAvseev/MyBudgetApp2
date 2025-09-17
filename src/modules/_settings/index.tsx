import React, { JSX } from "react";
import { View, StyleSheet, Pressable, Switch } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { PageContainer } from "../../components/PageContainer";
import { TThemeList } from "@/src/theme/types";
import { THEME, useSetThemeMutation, useTheme } from "@/src/theme";
import { Text } from "@/src/components/Text";
import Checkbox from "expo-checkbox";

type props = {
  navigation: NavigationProp<{}>;
};

export default function Settings({ navigation }: props): JSX.Element {
  const theme = useTheme();

  const setThemeMutation = useSetThemeMutation();
  const setThemeHandler = (newTheme: TThemeList) => {
    setThemeMutation.mutate(newTheme);
  };
  return (
    <PageContainer navigation={navigation}>
      <Text style={styles.title}>Настройки</Text>
      <View style={styles.theme}>
        <Text>Тёмная тема</Text>
        <Checkbox
          onChange={() => setThemeHandler(theme === "light" ? "dark" : "light")}
          value={theme === "dark"}
          color={THEME.palette[theme].color.primary}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: THEME.styles.text.fontSize.lg,
    fontWeight: "bold",
    marginBottom: THEME.styles.spacing.lg,
    width: "100%",
    textAlign: "center",
  },
  theme: {
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    gap: THEME.styles.spacing.md,
  },
});
