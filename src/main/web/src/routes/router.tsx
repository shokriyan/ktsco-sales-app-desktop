import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BillsMainPage from "../components/bills/BillsMainPage";
import CustomerMainPage from "../components/customers/CustomerMainPage";
import ProductsMainPage from "../components/products/ProductsMainPage";
import SalesBillDetailMainPage from "../components/sales/SalesBillDetailMainPage";
import SalesMainPage from "../components/sales/SalesMainPage";
import StockDetailMain from "../components/stock/StockDetailMain";
import StockMainPage from "../components/stock/StockMainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <BillsMainPage />,
      },
      {
        path: "/customers",
        element: <CustomerMainPage />,
      },
      {
        path: "bill/:id",
        element: <SalesBillDetailMainPage />,
      },
      {
        path: "/products",
        element: <ProductsMainPage />,
      },
      {
        path: "/sales",
        element: <SalesMainPage />,
      },
      {
        path: "/stock",
        element: <StockMainPage />,
      },
      {
        path: "/stock/:productId",
        element: <StockDetailMain />,
      },
    ],
  },
]);

export default router;
