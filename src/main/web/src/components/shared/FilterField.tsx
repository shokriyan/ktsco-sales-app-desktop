import { Box, Input } from "@chakra-ui/react";
import { Column, Table } from "@tanstack/react-table";

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue !== "number" ? (
    <Input
      name="columnFilter"
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`جستجو...`}
    />
  ) : (
    <Box height={10}></Box>
  );
}

export default Filter;
