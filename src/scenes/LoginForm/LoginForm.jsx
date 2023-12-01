import { Box, FormHelperText } from "@mui/material";

import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import "./LoginForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
const LoginForm = () => {
  // const [_, { language }] = useTranslation();
  // const [signIn] = useSignInMutation();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState(false);
  const [loading, setLoading] = useState(false);
  const textBottom = "LET'S GO";
  const handelShowPassword = () => {
    setPasswordType(!passwordType);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("*Should be a valid email")
        .required("Required"),
      password: yup.string().required("Required").min(8),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("https://andrew-demo.onrender.com/user/login", values)
        .then((res) => {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          setLoading(false);
          navigate("/home", { replace: true });
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e.response.data.message);
        });
    },
  });
  return (
    <Box className="login">
      <Box className="login_box">
        <Box className="left">
          <Box className="contact">
            <form onSubmit={formik.handleSubmit}>
              <h3>SIGN IN</h3>
              <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="EMAIL"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <FormHelperText sx={{ color: "red" }} id="email">
                  {formik.errors.email}
                </FormHelperText>
              )}
              <Box className="password-input">
                <input
                  type={passwordType ? "text" : "password"}
                  placeholder="PASSWORD"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <Box className="showPassword" onClick={handelShowPassword}>
                  {passwordType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Box>
              </Box>
              {formik.errors.password && formik.touched.password && (
                <FormHelperText sx={{ color: "red" }} id="email">
                  {formik.errors.password}
                </FormHelperText>
              )}
              <button
                className="submit"
                style={loading ? { padding: "10px 85px" } : {}}
                type="submit"
              >
                {loading ? (
                  <CircularProgress
                    size="1.5rem"
                    sx={{
                      color: "#fff",
                    }}
                  />
                ) : (
                  textBottom
                )}
              </button>
            </form>
          </Box>
        </Box>
        <Box className="right">
          <Box className="right-text">
            <h5>Welcome to your control panal </h5>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
