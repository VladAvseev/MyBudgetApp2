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

export default function Settings({ navigation }: props): JSX.Element {
  const theme = useTheme();

  const setThemeMutation = useSetThemeMutation();
  const setThemeHandler = (newTheme: TThemeList) => {
    setThemeMutation.mutate(newTheme);
  };
  return (
    <PageContainer navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Настройки</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 10,
          }}
        >
          <Text>Тёмная тема</Text>
          <Pressable
            onPress={() =>
              setThemeHandler(theme === "light" ? "dark" : "light")
            }
          >
            <Switch
              value={theme === "dark"}
              trackColor={{
                false: THEME.palette[theme].color.secondary,
                true: THEME.palette[theme].color.secondary,
              }}
              thumbColor={THEME.palette[theme].color.primary}
            />
          </Pressable>
        </View>
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
