import React, { useState } from "react";
import {
  Avatar,
  Alert,
  Grid,
  Link,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLogin, useLoginWithGoogle } from "../hooks/useAuth";

export const Login = () => {
  const { login, success, error } = useLogin();
  const { loginWithGoogle, success, error } = useLoginWithGoogle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  const onClickGoogleLogin = () => {
    loginWithGoogle();
    console.log("googleログインボタン押下");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="signup" variant="body2">
                アカウントをお持ちでない方
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClickGoogleLogin}
          >
            googleログイン
          </Button>
        </Box>
      </Box>
      {error && <Alert severity="error">ログインできませんでした</Alert>}
      {success && <Alert severity="success">ログインしました</Alert>}
    </Container>
  );
};
