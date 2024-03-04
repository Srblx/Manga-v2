import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListManga } from "../ListManga";
import SingleManga from "../SingleManga";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { PageNumberProvider } from "../../context/PageNumberProvider";
import NavBar from "../../components/NavBar.component";
import { News } from "../News";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { Profile } from "../Profile";
import { AddNews } from "../AddNews";

export function Screens() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <NavBar />
        <PageNumberProvider>
          <Routes>
            <Route path="/" element={<ListManga />} />
            <Route path="/:id" element={<SingleManga />} />
            <Route path="/" element={<ListManga />} />
            <Route path="/news" element={<News />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/AddNews" element={<AddNews/>}/>
          </Routes>
        </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
