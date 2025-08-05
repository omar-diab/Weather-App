import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import CardContent from "./CardContent";
import Button from "@mui/material/Button";

import useThemeMode from "../context/theme/ThemeContext";

const WApp = () => {
  const { mode, toggleTheme } = useThemeMode();


  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingY: 8,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl">WEATHER</h1>
        <div>
          {mode === "dark" ? (
            <IconButton onClick={toggleTheme}>
              <Brightness5OutlinedIcon sx={{ color: "yellow" }} />
            </IconButton>
          ) : (
            <IconButton onClick={toggleTheme}>
              <Brightness3OutlinedIcon sx={{ color: "darkblue" }} />
            </IconButton>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="flex-grow flex items-center justify-center">
        <Card
          sx={{
            minWidth: "100%",
            minHeight: 450,
            bgcolor: "#1e88e5",
            color: "white",
            padding: 5,
            borderRadius: 7,
            boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent />
        </Card>
      </div>
      {/* Languages */}
      <div className="flex items-center justify-start">
        <Button
          variant="text"
          sx={{ fontSize: 18, p: 1, borderBottom: 1, mt: 1, mx: 2 }}
        >
          Arabic
        </Button>
      </div>
    </Container>
  );
};

export default WApp;
