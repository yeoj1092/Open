import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ArticleTable from "../components/Table";
import { CurrentUrlContext } from "../context/CurrentUrlContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { analystTableColumns } from "../components/tableColumns";
import { getArticle } from "../services/articlesService";

const AnalyseArticle = () => {
  // Current URL state
  const [, setSelectedUrl] = useContext(CurrentUrlContext);
  const [, setCurrentUser] = useContext(CurrentUserContext);

  // Articles
  const [articles, setArticles] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Navigation event from React Router
    if (document.referrer !== "") {
      setSelectedUrl("/analyse-article");
      setCurrentUser("Analyst");
    }

    // Grab all the articles and store it as state.
    getArticle()
      .then((data) => {
        const articles = data.data.filter(
          (article) => article.moderated && !article.approved
        );
        setArticles(articles);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setSelectedUrl, setCurrentUser]);

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        margin: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Analyse Articles</h1>
      {isLoading ? (
        <></>
      ) : (
        <Box>
          <ArticleTable
            data={articles}
            columns={analystTableColumns}
            isAnalyst={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default AnalyseArticle;
