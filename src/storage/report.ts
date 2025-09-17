import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateId } from "../utils/generateId";

export interface ITag {
  id: number;
  title: string;
  limit: number;
}

export interface IExpense {
  id: number;
  title: string;
  value: number;
  tags: number[];
}

export interface IIncome {
  id: number;
  title: string;
  value: number;
}

export interface IReport {
  id: number;
  title: string;
  period: {
    start: Date;
    end: Date;
  };
  tags: ITag[];
  expenses: IExpense[];
  incomes: IIncome[];
}

// Ключи для AsyncStorage
const REPORT_KEYS = {
  ALL_REPORTS: "reports_list",
  REPORT: (id: number) => `report_${id}`,
};

// Функция для получения всех отчётов
const getAllReports = async (): Promise<IReport[]> => {
  try {
    const reportsJSON = await AsyncStorage.getItem(REPORT_KEYS.ALL_REPORTS);
    if (reportsJSON) {
      const reportIds: number[] = JSON.parse(reportsJSON);
      const reportPromises = reportIds.map((id) => getReportById(id));
      const reports = await Promise.all(reportPromises);
      return reports.filter((report): report is IReport => report !== null);
    }
    return [];
  } catch (error) {
    console.error("Ошибка при получении списка отчётов:", error);
    return [];
  }
};

// Функция для получения отчёта по ID
const getReportById = async (id: number): Promise<IReport | null> => {
  try {
    const reportJSON = await AsyncStorage.getItem(REPORT_KEYS.REPORT(id));
    if (reportJSON) {
      return JSON.parse(reportJSON, (key, value) => {
        if (key === "start" || key === "end") return new Date(value);
        return value;
      });
    }
    return null;
  } catch (error) {
    console.error(`Ошибка при получении отчёта с ID ${id}:`, error);
    return null;
  }
};

// Функция для получения списка отчётов без деталей (только id и title)
const getReportsWithoutDetails = async (): Promise<
  Pick<IReport, "id" | "title">[]
> => {
  try {
    const reportsJSON = await AsyncStorage.getItem(REPORT_KEYS.ALL_REPORTS);
    if (reportsJSON) {
      const reportIds: number[] = JSON.parse(reportsJSON);

      // Получаем только необходимые поля для каждого отчёта
      const reportPromises = reportIds.map(async (id) => {
        try {
          const reportJSON = await AsyncStorage.getItem(REPORT_KEYS.REPORT(id));
          if (reportJSON) {
            const report: IReport = JSON.parse(reportJSON);
            return {
              id: report.id,
              title: report.title,
            };
          }
          return null;
        } catch (error) {
          console.error(`Ошибка при получении отчёта с ID ${id}:`, error);
          return null;
        }
      });

      const reports = await Promise.all(reportPromises);
      return reports.filter(
        (report): report is Pick<IReport, "id" | "title"> => report !== null
      );
    }
    return [];
  } catch (error) {
    console.error("Ошибка при получении списка отчётов:", error);
    return [];
  }
};

// Функция для добавления нового отчёта
const addReport = async (): Promise<void> => {
  try {
    // Создаём уникальный ID для нового отчёта
    const ID = generateId();
    // Сохраняем отчёт по ключу с ID
    await AsyncStorage.setItem(
      REPORT_KEYS.REPORT(ID),
      JSON.stringify({
        id: ID,
        title: "Новый отчёт",
        period: { start: new Date(), end: new Date() },
        tags: [],
        expenses: [],
        incomes: [],
      })
    );

    // Обновляем список всех отчётов
    const reportsJSON = await AsyncStorage.getItem(REPORT_KEYS.ALL_REPORTS);
    let reportIds: number[] = [];
    if (reportsJSON) {
      reportIds = JSON.parse(reportsJSON);
    }
    if (!reportIds.includes(ID)) {
      reportIds.push(ID);
      await AsyncStorage.setItem(
        REPORT_KEYS.ALL_REPORTS,
        JSON.stringify(reportIds)
      );
    }
  } catch (error) {
    console.error("Ошибка при добавлении отчёта:", error);
    throw error;
  }
};

// Функция для удаления отчёта по ID
const deleteReport = async (id: number): Promise<void> => {
  try {
    // Удаляем отчёт
    await AsyncStorage.removeItem(REPORT_KEYS.REPORT(id));

    // Обновляем список всех отчётов
    const reportsJSON = await AsyncStorage.getItem(REPORT_KEYS.ALL_REPORTS);
    if (reportsJSON) {
      let reportIds: number[] = JSON.parse(reportsJSON);
      reportIds = reportIds.filter((reportId) => reportId !== id);
      await AsyncStorage.setItem(
        REPORT_KEYS.ALL_REPORTS,
        JSON.stringify(reportIds)
      );
    }
  } catch (error) {
    console.error(`Ошибка при удалении отчёта с ID ${id}:`, error);
    throw error;
  }
};

// Функция для обновления отчёта
const updateReport = async (report: IReport): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      REPORT_KEYS.REPORT(report.id),
      JSON.stringify(report)
    );
  } catch (error) {
    console.error(`Ошибка при обновлении отчёта с ID ${report.id}:`, error);
    throw error;
  }
};

// Функция для изменения периода отчёта
const updateReportPeriod = async (
  reportId: number,
  period: { start: Date; end: Date }
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.period = period;
    await updateReport(report);
  }
};

// Функция для изменения названия отчёта
const updateReportTitle = async (
  reportId: number,
  title: string
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.title = title;
    await updateReport(report);
  }
};

// Функции для работы с тегами в отчёте
const getTagsByReportId = async (reportId: number): Promise<ITag[]> => {
  try {
    const report = await getReportById(reportId);
    if (report) {
      return report.tags;
    }
    return [];
  } catch (error) {
    console.error(`Ошибка при получении тегов отчёта с ID ${reportId}:`, error);
    return [];
  }
};

const setTagsForReport = async (
  reportId: number,
  tags: ITag[]
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.tags = tags;
    await updateReport(report);
  }
};

const addTagToReport = async (reportId: number, tag: ITag): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.tags.push(tag);
    await updateReport(report);
  }
};

const updateTagInReport = async (
  reportId: number,
  tagId: number,
  updatedTag: ITag
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    const index = report.tags.findIndex((tag) => tag.id === tagId);
    if (index !== -1) {
      report.tags[index] = updatedTag;
      await updateReport(report);
    }
  }
};

const deleteTagFromReport = async (
  reportId: number,
  tagId: number
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    // Удаляем тег из массива тегов отчета
    report.tags = report.tags.filter((tag) => tag.id !== tagId);

    // Удаляем ID тега из всех расходов
    report.expenses = report.expenses.map((expense) => ({
      ...expense,
      tags: expense.tags.filter((id) => id !== tagId),
    }));

    await updateReport(report);
  }
};

// Функции для работы с расходами в отчёте
const addExpenseToReport = async (
  reportId: number,
  expense: IExpense
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.expenses.push(expense);
    await updateReport(report);
  }
};

const updateExpenseInReport = async (
  reportId: number,
  expenseId: number,
  updatedExpense: IExpense
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    const index = report.expenses.findIndex((exp) => exp.id === expenseId);
    if (index !== -1) {
      report.expenses[index] = updatedExpense;
      await updateReport(report);
    }
  }
};

const deleteExpenseFromReport = async (
  reportId: number,
  expenseId: number
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.expenses = report.expenses.filter((exp) => exp.id !== expenseId);
    await updateReport(report);
  }
};

// Функции для работы с доходами в отчёте
const addIncomeToReport = async (
  reportId: number,
  income: IIncome
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.incomes.push(income);
    await updateReport(report);
  }
};

const updateIncomeInReport = async (
  reportId: number,
  incomeId: number,
  updatedIncome: IIncome
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    const index = report.incomes.findIndex((inc) => inc.id === incomeId);
    if (index !== -1) {
      report.incomes[index] = updatedIncome;
      await updateReport(report);
    }
  }
};

const deleteIncomeFromReport = async (
  reportId: number,
  incomeId: number
): Promise<void> => {
  const report = await getReportById(reportId);
  if (report) {
    report.incomes = report.incomes.filter((inc) => inc.id !== incomeId);
    await updateReport(report);
  }
};

// Экспортируем объект со всеми функциями
export const ReportStorage = {
  addReport,
  getAllReports,
  getReportById,
  getReportsWithoutDetails,
  deleteReport,
  updateReport,
  setTagsForReport,
  updateReportPeriod,
  getTagsByReportId,
  updateReportTitle,
  addTagToReport,
  updateTagInReport,
  deleteTagFromReport,
  addExpenseToReport,
  updateExpenseInReport,
  deleteExpenseFromReport,
  addIncomeToReport,
  updateIncomeInReport,
  deleteIncomeFromReport,
};
