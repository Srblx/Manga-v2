import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListManga } from "../ListManga";
import SingleManga from "../SingleManga";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { PageNumberProvider } from "../../context/PageNumberProvider";
import NavBar from "../../components/NavBar.component";
import { About } from "../About";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { Profile } from "../Profile";

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
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
