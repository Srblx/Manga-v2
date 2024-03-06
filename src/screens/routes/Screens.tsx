import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ListManga } from "../ListManga.screen";
import SingleManga from "../SingleManga";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { PageNumberProvider } from "../../context/PageNumberProvider";
import NavBar from "../../components/NavBar.component";
import { Profile } from "../Profile.screen";
import { useUserContext } from "../../context/UserContext";
import { FormAddNews } from "../AddNews.screen";
import { EditNews } from "../EditNews.screen";
import { ShowNews } from "../News.screen";
import { LoginForm } from "../LoginForm.screen";
import { SignUpForm } from "../SignUpForm.component";

export function Screens() {
  const { user } = useUserContext();
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <NavBar />
        <PageNumberProvider>
          {user ? (
            <Routes>
              <Route path="/" element={<ListManga />} />
              <Route path="/:id" element={<SingleManga />} />
              <Route path="/" element={<ListManga />} />
              <Route path="/news" element={<ShowNews />} />

              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/AddNews" element={<FormAddNews />} />
              <Route path="/editNews" element={<EditNews />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
          )}
        </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
