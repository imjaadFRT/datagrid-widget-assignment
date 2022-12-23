import React, { useEffect, useMemo } from "react";
import { useDetectMobile, useTransactionData } from "../../hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { CacheProvider } from "@emotion/react";
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 1280,
      xl: 1920,
    },
  },
} as ThemeOptions);

interface TableProps {
  columns: ColumnType[];
  apiUrl: string;
  title?: string;
  subtitle?: string;
}

const options = {
  viewColumns: false,
  selectableRowsHideCheckboxes: true,
  isRowSelectable: () => false,
  search: false,
  resizableColumns: true,
  print: false,
  filter: false,
  sort: false,
  download: false,
};

export const DataGrid = ({ columns, apiUrl, title, subtitle }: TableProps) => {
  const { data, loading, error } = useTransactionData(apiUrl);
  const { isMobile } = useDetectMobile();

  const shouldPickTitle = Boolean(title?.length && subtitle?.length);

  const prepareColumns = useMemo(() => {
    if (isMobile) {
      if (shouldPickTitle) {
        const filteredNames = columns.filter(
          (item) => item.key === title || item.key === subtitle
        );

        if (filteredNames[0].key !== title) filteredNames.reverse();

        return filteredNames.map((column) => ({
          name: column.key,
          label: column.label,
        }));
      } else {
        return columns
          .slice(0, 2)
          .map((column) => ({ name: column.key, label: column.label }));
      }
    } else
      return columns.map((item) => ({ name: item.key, label: item.label }));
  }, [columns, isMobile, subtitle, title]);

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={""}
          data={data ?? []}
          columns={prepareColumns}
          options={{ ...options, responsive: "simple" }}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default DataGrid;
