import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Select,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  chakra,
} from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  BiFirstPage,
  BiLastPage,
  BiLeftArrow,
  BiRightArrow,
  BiSortAlt2,
} from "react-icons/bi";
import Banner from "./Banner";
import Filter from "./FilterField";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  itemPerPage?: 5 | 10 | 25 | 50;
  haveFilter?: boolean;
};

export function CustomTable<Data extends object>({
  data,
  columns,
  itemPerPage = 10,
  haveFilter = false,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: itemPerPage } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });
  if (data.length == 0) {
    return <Banner type="warning">اطلاعات ثبت نشده است</Banner>;
  }
  return (
    <TableContainer width="100%">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.placeholderId
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <chakra.span
                    ml={2}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.getCanSort() ? (
                      header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <Icon as={AiOutlineSortDescending} fontSize="14px" />
                        ) : (
                          <Icon as={AiOutlineSortAscending} fontSize="14px" />
                        )
                      ) : (
                        <Icon as={BiSortAlt2} fontSize="14px" />
                      )
                    ) : null}
                  </chakra.span>
                  {haveFilter ? (
                    header.column.getCanFilter() ? (
                      <Box>
                        <Filter column={header.column} table={table} />
                      </Box>
                    ) : (
                      <Box height={10}></Box>
                    )
                  ) : null}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td
                    key={cell.id}
                    wordBreak="break-all"
                    width={cell.column.id.includes("Icon") ? "10%" : ""}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {table.getPageCount() > 1 && (
        <Flex justify="flex-end" pt={10}>
          <HStack spacing={6}>
            <IconButton
              aria-label="previous"
              icon={<BiLastPage />}
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
            />
            <IconButton
              aria-label="previous"
              icon={<BiRightArrow />}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            />
            <IconButton
              aria-label="previous"
              icon={<BiLeftArrow />}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            />
            <IconButton
              aria-label="previous"
              icon={<BiFirstPage />}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
            />
            <Spacer />
            <Text>
              صفحه {table.getState().pagination.pageIndex + 1} از{" "}
              {table.getPageCount()}
            </Text>
            <Spacer></Spacer>
            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 25, 50].map((option) => (
                <option value={option} key={option}>
                  نمایش {option}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>
      )}
    </TableContainer>
  );
}
