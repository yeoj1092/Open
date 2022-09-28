import { Alert, Box, Snackbar, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdown";
import { getPractices } from "../services/practicesService";
import { addArticle } from "../services/articlesService";
import { CurrentUrlContext } from "../context/CurrentUrlContext";
import { isAllDigits } from "../utilities";

const ProposeArticle = () => {
  // Current URL state
  const [, setSelectedUrl] = useContext(CurrentUrlContext);

  // Dropdown States
  const [practices, setPractices] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState("");

  // Text Field States
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [source, setSource] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [doi, setDoi] = useState("");

  // Feedback Messag States
  const [feedback, setFeedback] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isFeedbackError, setIsFeedbackError] = useState(false);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Clears all Input fields.
   */
  const clearFields = () => {
    setTitle("");
    setAuthors("");
    setSource("");
    setPublicationYear("");
    setDoi("");
    setSelectedPractice("");
  };

  /**
   * Submits a new article using a POST request.
   */
  const handleAddArticle = () => {
    const article = {
      title: title,
      authors: authors,
      source: source,
      pubyear: publicationYear,
      doi: doi,
      claim: "",
      evidence: "",
      sepractice: selectedPractice,
      moderated: false,
      approved: false,
    };
    if (
      title === "" ||
      authors === "" ||
      source === "" ||
      publicationYear === "" ||
      doi === ""
    ) {
      setFeedback("All fields must not be empty");
      setIsFeedbackError(true);
      setFeedbackOpen(true);
    } else if (!isAllDigits(publicationYear)) {
      setFeedback("Publication year must be a valid year.");
      setIsFeedbackError(true);
      setFeedbackOpen(true);
    } else {
      addArticle(article)
        .then((data) => {
          setFeedback(data.data.msg);
          setIsFeedbackError(false);
          clearFields();
        })
        .catch((data) => {
          setFeedback(data.data.error);
          setIsFeedbackError(true);
        })
        .finally(() => {
          setFeedbackOpen(true);
          setIsLoading(false);
        });
    }
  };

  /**
   * Handles TextInput state onChange.
   *
   * @param {*} setState
   * @returns
   */
  const handleTextChange = (setState) => (event) => {
    setState(event.target.value);
  };

  /**
   * Handles closing the snackbar feedback.
   * @param {*} event
   * @param {*} reason
   * @returns
   */
  const handleFeedbackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setFeedbackOpen(false);
  };

  /**
   * GET request to populate dropdown with choices for SE Practice.
   */
  useEffect(() => {
    setSelectedUrl("propose-article");
    getPractices()
      .then((data) => {
        const practices = data.map((practice) => practice.practice);
        setPractices(practices);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setSelectedUrl]);

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
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          "& .MuiFormControl-root, button, h4, p": {
            marginBottom: "12px",
          },
        }}
        data-testid="propose-article-form"
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          Propose Article
        </Typography>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTextChange(setTitle)}
        />
        <TextField
          id="authors"
          label="Authors"
          variant="outlined"
          value={authors}
          onChange={handleTextChange(setAuthors)}
        />
        <TextField
          id="source"
          label="Source"
          variant="outlined"
          value={source}
          onChange={handleTextChange(setSource)}
        />
        <TextField
          id="publication-year"
          label="Publication Year"
          variant="outlined"
          value={publicationYear}
          onChange={handleTextChange(setPublicationYear)}
        />
        <TextField
          id="doi"
          label="DOI"
          variant="outlined"
          value={doi}
          onChange={handleTextChange(setDoi)}
        />
        <Dropdown
          menuItems={practices}
          selected={selectedPractice}
          setSelected={setSelectedPractice}
          isLoading={isLoading}
          label="Select SE Practice"
        />
        <CustomButton
          label="Submit Article"
          onClick={handleAddArticle}
          isLoading={isLoading}
        />
      </Box>
      <Snackbar
        open={feedbackOpen}
        autoHideDuration={5000}
        onClose={handleFeedbackClose}
      >
        <Alert
          onClose={handleFeedbackClose}
          severity={isFeedbackError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {feedback}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProposeArticle;
