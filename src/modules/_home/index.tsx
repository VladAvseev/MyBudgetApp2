import React, { JSX } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { PageContainer } from "../../components/PageContainer";
import { THEME } from "@/src/theme";
import { Text } from "@/src/components/Text";
import { ReportList } from "./components/ReportList";

type props = {
  navigation: NavigationProp<{}>;
};

export default function Home({ navigation }: props): JSX.Element {
  return (
    <PageContainer navigation={navigation}>
      <Text style={styles.title}>Главная страница</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ReportList />
      </ScrollView>
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
});
