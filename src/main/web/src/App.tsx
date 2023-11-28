import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

function App() {
  return (
    <Grid templateAreas={`"header" "main"`}>
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"main"} padding={5}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
