import React, { JSX } from "react";
import { View, StyleSheet, Pressable, Switch } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { PageContainer } from "../../components/PageContainer";
import { TThemeList } from "@/src/theme/types";
import { THEME, useSetThemeMutation, useTheme } from "@/src/theme";
import { Text } from "@/src/components/Text";

type props = {
  navigation: NavigationProp<{}>;
};

export default function Home({ navigation }: props): JSX.Element {
  const theme = useTheme();

  const setThemeMutation = useSetThemeMutation();
  const setThemeHandler = (newTheme: TThemeList) => {
    setThemeMutation.mutate(newTheme);
  };
  return (
    <PageContainer navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Главная страница</Text>
        <Text>Добро пожаловать в приложение!</Text>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: THEME.styles.text.fontSize.lg,
    fontWeight: "bold",
    marginBottom: THEME.styles.spacing.lg,
  },
});
