import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListManga } from "../ListManga";
import SingleManga from "../SingleManga";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { PageNumberProvider } from "../../context/PageNumberProvider";
import NavBar from "../../components/NavBar.component";

export function Screens() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <NavBar />
        <PageNumberProvider>
          <Routes>
            <Route path="/" element={<ListManga />} />
            <Route path="/:id" element={<SingleManga />} />
          </Routes>
        </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
