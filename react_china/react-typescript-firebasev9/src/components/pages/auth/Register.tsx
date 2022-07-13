import React from "react";
import { FC, memo, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Register: FC = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //const { register, loginWithFacebook } = useAuth();
  const { register } = useAuth();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const onClickRegister = () => register(email, password);
  //const onClickFacebookRegister = () => loginWithFacebook();

  return (
    <>
      <div className="container">
        <div className="auth-box">
          <h1>Register</h1>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <label>Password (confirm)</label>
          <input
            type="password"
            placeholder="Password - confirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <button
            className="auth-button"
            onClick={onClickRegister}
            disabled={
              email === "" ||
              password === "" ||
              passwordConfirm === "" ||
              password !== passwordConfirm
            }
          >
            Register
          </button>
          {/* or
          <button className="auth-facebook" onClick={onClickFacebookRegister}>
            Facebook
          </button> */}
        </div>
        <div className="other-option">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
});

Register.displayName = "Register";