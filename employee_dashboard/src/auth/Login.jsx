import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, width: "100%" }} elevation={4}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Employee Dashboard Login
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
