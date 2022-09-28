import { Button } from "@mui/material";

const CustomButton = ({
  label,
  onClick,
  isLoading = false,
  bgcolor = "#111",
  margin = "0px",
}) => (
  <Button
    variant="contained"
    size="large"
    sx={{
      margin,
      bgcolor,
      textTransform: "capitalize",
      fontWeight: "bold",
      ":hover": { bgcolor, opacity: 0.8 },
    }}
    onClick={onClick}
    disabled={isLoading}
  >
    {label}
  </Button>
);

export default CustomButton;
