import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Link,
  List,
  Box,
  ListItem,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActions,
  DialogContent,
  ButtonBase,
  TextField,
} from "@mui/material";
import CustomButton from "./CustomButton";

const ArticleTable = ({
  data,
  columns,
  handleAccept,
  handleReject,
  isModerator = false,
  isAnalyst = false,
  moderationLoading = false,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setModalOpen] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const openModal = (row) => {
    setModalOpen(true);
    setSelectedArticle(row);
  };

  const handleOnModalOpen = (row) => {
    if (!isModerator && !isAnalyst) {
      openModal(row);
    }
  };

  const handleReviewModalOpen = (row) => () => {
    openModal(row);
  };

  const renderDynamicCells = (row) => {
    if (isModerator) {
      return (
        <TableCell align="right">
          <CustomButton
            label="Accept"
            bgcolor="#09f"
            onClick={handleAccept(row._id)}
            isLoading={moderationLoading}
          />
          <CustomButton
            label="Reject"
            bgcolor="#fc3730"
            margin="0px 0px 0px 8px"
            onClick={handleReject(row._id)}
            isLoading={moderationLoading}
          />
        </TableCell>
      );
    } else if (isAnalyst) {
      return (
        <TableCell align="right">
          <ButtonBase onClick={handleReviewModalOpen(row)}>
            <Typography
              variant="body2"
              sx={{
                marginLeft: "8px",
                color: "#09f",
                ":hover": { textDecoration: "underline" },
              }}
            >
              View
            </Typography>
          </ButtonBase>
        </TableCell>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <Modal
              open={open}
              onClose={() => setModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "fit-content",
                  margin: "60px auto 0px auto",
                }}
              >
                {selectedArticle ? (
                  <ArticleSummary
                    title={selectedArticle.title}
                    authors={selectedArticle.authors}
                    source={selectedArticle.source}
                    pubyear={selectedArticle.pubyear}
                    doi={selectedArticle.doi}
                    claim={selectedArticle.claim}
                    evidence={selectedArticle.evidence}
                    isAnalyst={isAnalyst}
                  />
                ) : (
                  <div>Nothing to show</div>
                )}
              </DialogContent>
            </Modal>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    onClick={() => handleOnModalOpen(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (value !== undefined) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <React.Fragment key={column.id}></React.Fragment>
                        );
                      }
                    })}
                    {renderDynamicCells(row)}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const ArticleSummary = React.forwardRef(
  (
    { title, authors, source, pubyear, doi, claim, evidence, isAnalyst },
    ref
  ) => {
    const dynamicallyRenderListItem = (text) => {
      if (isAnalyst) {
        return <TextField sx={{ width: "100%" }} variant="outlined" />;
      }

      return (
        <Paper style={{ maxHeight: 200, overflow: "auto", margin: 10 }}>
          <ListItem>{text !== undefined ? text : "Nothing to show."}</ListItem>
        </Paper>
      );
    };

    const dynamicallyRenderButtons = () => {
      if (isAnalyst) {
        return (
          <Box>
            <CustomButton
              label="Reject"
              bgcolor="#fc3730"
              margin="0px 8px 0px 0px"
            />
            <CustomButton label="Approve" />
          </Box>
        );
      }
      return <></>;
    };
    return (
      <Card sx={popupStyle} ref={ref}>
        <CardContent sx={{ width: "100%", padding: "0px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            written by {authors} | {pubyear}, {source}
          </Typography>
          {/* claims */}
          <Box style={{ marginTop: 24 }}>
            <Typography variant="h7">Claim</Typography>
            <List>{dynamicallyRenderListItem(claim)}</List>
          </Box>
          <Box style={{ marginTop: 24 }}>
            <Typography variant="h7">Evidence</Typography>
            <List>{dynamicallyRenderListItem(evidence)}</List>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: "0px",
            marginTop: "12px",
          }}
        >
          <Link href={doi} color="text.secondary">
            {doi}
          </Link>
          {dynamicallyRenderButtons()}
        </CardActions>
      </Card>
    );
  }
);



const popupStyle = {
  width: 900,
  bgcolor: "background.paper",
  p: 4,
};

export default ArticleTable;
