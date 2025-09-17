import { Text } from "@/src/components/Text";
import { THEME, useTheme } from "@/src/theme";
import { Pressable, StyleSheet } from "react-native";
import { useDeleteReportMutation } from "../api/deleteReport";

interface props {
  id: number;
  title: string;
}

export const Report = ({ id, title }: props) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    main: {
      width: "100%",
      padding: THEME.styles.spacing.md,
      backgroundColor: THEME.palette[theme].color.secondary,
      borderRadius: 10,

      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });

  const deleteReportMutation = useDeleteReportMutation();
  const deleteReportHandler = () => {
    deleteReportMutation.mutate(id);
  };

  return (
    <Pressable onPress={deleteReportHandler} style={styles.main}>
      <Text>{`${title} (${id})`} </Text>
    </Pressable>
  );
};
