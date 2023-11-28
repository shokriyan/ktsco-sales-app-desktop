import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/dashboard/Dashboard";
import CustomerMainPage from "../components/customers/CustomerMainPage";
import SalesMainPage from "../components/sales/SalesMainPage";
import ProductsMainPage from "../components/products/ProductsMainPage";
import BillsMainPage from "../components/bills/BillsMainPage";
import SalesBillDetailMainPage from "../components/sales/SalesBillDetailMainPage";
import StockMainPage from "../components/stock/StockMainPage";
import StockDetailMain from "../components/stock/StockDetailMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/customers",
        element: <CustomerMainPage />,
      },
      {
        path: "/bills",
        element: <BillsMainPage />,
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
