import { THEME } from "@/src/theme";
import { StyleSheet, View } from "react-native";
import { AddReport } from "./AddReport";
import { Report } from "./Report";
import { useReportsQuery } from "../api/getReports";

export const ReportList = () => {
  const { data = [] } = useReportsQuery();

  const styles = StyleSheet.create({
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: THEME.styles.spacing.lg,
    },
  });

  return (
    <View style={styles.list}>
      <AddReport />
      {data.map((report) => (
        <Report id={report.id} title={report.title} />
      ))}
    </View>
  );
};
