import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "../../services/product";
import { CustomTable } from "../shared/CustomTable";
import IconBtn from "../shared/buttons/IconBtn";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import DeleteProduct from "./DeleteProduct";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
  onDeleteSuccess: (id: number) => void;
}

const ProductTable = ({ products, onDeleteSuccess }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.display({
      id: "deleteIcon",
      header: "حدف",
      cell: (info) => (
        <IconBtn
          icon="delete"
          color="warning"
          onClick={() => {
            setSelectedProduct(info.row.original);
            onOpen();
          }}
        />
      ),
    }),
    columnHelper.accessor("productId", {
      cell: (info) => info.getValue(),
      header: "کد محصول",
    }),
    columnHelper.accessor("productName", {
      cell: (info) => info.getValue(),
      header: "نام محصول",
    }),
    columnHelper.accessor("unit", {
      cell: (info) => info.getValue(),
      header: "واحد شمارش",
    }),
    columnHelper.display({
      id: "detailIcon",
      header: "جزییات",
      cell: (info) => (
        <IconBtn
          icon="detail"
          color="secondary"
          onClick={() => {
            navigate(`/stock/${info.row.original.productId}`);
          }}
        />
      ),
    }),
  ];

  return (
    <>
      {selectedProduct && (
        <DeleteProduct
          product={selectedProduct}
          isOpen={isOpen}
          onClose={onClose}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
      <CustomTable data={products} columns={columns} haveFilter />
    </>
  );
};

export default ProductTable;
