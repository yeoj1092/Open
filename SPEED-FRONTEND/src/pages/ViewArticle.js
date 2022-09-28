import { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { CurrentUrlContext } from "../context/CurrentUrlContext";
import Dropdown from "../components/Dropdown";
import ArticleTable from "../components/Table";

import { getPractices } from "../services/practicesService";
import { getArticle } from "../services/articlesService";
import { tableColumns } from "../components/tableColumns";

const ViewArticle = () => {
  // Current URL state
  const [, setSelectedUrl] = useContext(CurrentUrlContext);

  // Dropdown States
  const [practices, setPractices] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState("");

  // Articles
  const [articles, setArticles] = useState([]);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedUrl("view-article");
    getPractices()
      .then((data) => {
        const practices = data.map((practice) => practice.practice);
        setPractices(practices);
        handleSelectPractice(practices[0]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setSelectedUrl]);

  const handleSelectPractice = (practice) => {
    setSelectedPractice(practice);
    getArticle().then(({ data }) => {
      setArticles(
        data.filter(
          (data) =>
            data.sepractice === practice && data.moderated && data.approved
        )
      );
    });
  };

  const searchPractice = (article) => {
    if (!article) {
      getArticle()
        .then(({ data }) => {
          setArticles(
            data.filter((data) => data.sepractice === selectedPractice)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getArticle()
        .then(({ data }) => {
          setArticles(data.filter((data) => data.title === article));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
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
      <h1>View Articles</h1>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Dropdown
              menuItems={practices}
              selected={selectedPractice}
              setSelected={handleSelectPractice}
              isLoading={isLoading}
              label="SE Practices"
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="article-search"
              options={articles.map((option) => option.title)}
              renderInput={(params) => (
                <TextField {...params} label="Search Articles" />
              )}
              onChange={(event, newInputValue) => {
                searchPractice(newInputValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ArticleTable data={articles} columns={tableColumns} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewArticle;
