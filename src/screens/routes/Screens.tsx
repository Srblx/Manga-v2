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
import { Pages } from "../../utils/route.utils";

export function Screens() {
  const { user } = useUserContext();
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <NavBar />
        <PageNumberProvider>
          {user ? (
            <Routes>
              <Route path={Pages.HOME} element={<ListManga />} />
              <Route path={`${Pages.HOME}:id`} element={<SingleManga />} />
              <Route path={Pages.HOME} element={<ListManga />} />
              <Route path={Pages.NEWS} element={<ShowNews />} />

              <Route path={Pages.PROFILE} element={<Profile />} />
              <Route path={Pages.ADD_NEWS} element={<FormAddNews />} />
              <Route path={`${Pages.EDIT_NEWS}:newId`} element={<EditNews />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={Pages.HOME} element={<LoginForm />} />
              <Route path={Pages.SIGN_UP} element={<SignUpForm />} />
              <Route
                path={Pages.ALL_REDIRECT}
                element={<Navigate to={"/"} replace />}
              />
            </Routes>
          )}
        </PageNumberProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}
