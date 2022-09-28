import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import ProposeArticle from "./pages/ProposeArticle";
import ViewArticle from "./pages/ViewArticle";
import { CurrentUrlProvider } from "./context/CurrentUrlContext";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import ModerateArticle from "./pages/ModerateArticle";
import AnalyseArticle from "./pages/AnalyseArticle";

const App = () => {
    return (
        <Box className="App">
            <CurrentUserProvider>
                <CurrentUrlProvider>
                    <BrowserRouter>
                        <ResponsiveAppBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/propose-article"
                                element={<ProposeArticle />}
                            />
                            <Route
                                path="/view-article"
                                element={<ViewArticle />}
                            />
                            <Route
                                path="/moderate-article"
                                element={<ModerateArticle />}
                            />
                            <Route
                                path="/analyse-article"
                                element={<AnalyseArticle />}
                            />
                        </Routes>
                    </BrowserRouter>
                </CurrentUrlProvider>
            </CurrentUserProvider>
        </Box>
    );
};

export default App;
