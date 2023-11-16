import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 20,
  // });

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      renderCell: (params) => {
        return params.value.toUpperCase();
      },
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      renderCell: (params) => {
        return params.value.toUpperCase();
      },
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.4,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Transactions"} subtitle={"Entire List of Transactions"} />
      <Box
        height={"80vh"}
        mt={"40px"}
        sx={{
          "& .MuiDataGrid-root": {
            borderWidth: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important `,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onPaginationModelChange={(newPage) => setPage(newPage)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
