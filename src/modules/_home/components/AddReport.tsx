import { Text } from "@/src/components/Text";
import { THEME, useTheme } from "@/src/theme";
import { Pressable, StyleSheet } from "react-native";
import { useAddreportMutation } from "../api/addReport";

export const AddReport = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    main: {
      width: "100%",
      padding: THEME.styles.spacing.md,
      backgroundColor: THEME.palette[theme].color.primary,
      borderRadius: 10,

      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });

  const addReportMutation = useAddreportMutation();
  const addReportHandler = () => {
    addReportMutation.mutate();
  };

  return (
    <Pressable onPress={addReportHandler} style={styles.main}>
      <Text>Новый отчёт</Text>
    </Pressable>
  );
};
