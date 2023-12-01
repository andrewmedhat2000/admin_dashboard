import {
  Button,
  TextField,
  Box,
  RadioGroup,
  Radio,
  FormControl,
  FormHelperText,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UpdateUser = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  const handelShowPassword = () => {
    setPasswordType(!passwordType);
  };
  console.log(id);
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  var initialValues;
  const fetchData = () => {
    axiosInstance.get(`/user/getuser/${id}`).then((response) => {
      //console.log(response);
      // console.log(response.data.users);

      setData(response.data.user);
    });
  };
  console.log(data);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  initialValues = {
    name: data?.name,
    email: data?.email,
    password: data?.password,
    phone: data?.phone,
    role: data?.role,

    BOD: "",
  };
  const checkoutSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email().required("Required"),
    password: yup.string().required("Required").min(8),
    phone: yup.string().required("Required").min(10).max(14),
    role: yup.string().required("Required"),
    DOB: yup.string(),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const formData = new FormData();
      image && formData.append("image", image);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("role", values.role);
      formData.append("DOB", values.DOB);

      await axiosInstance
        .patch(`/user/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response);
          setImage(null);
          toast.success(response.data.message);
          resetForm();
          setLoading(false);

          navigate("/home");
        })
        .catch((error) => {
          toast.error(error.response.data.message);

          setLoading(false);

          // console.error("error: ", error);
        });
    } catch (error) {
      toast.error("Something wrong happened while Add User");
      setLoading(false);

      //console.error("Error uploading file: ", error);
    }
  };
  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
    console.log("event", event.target.files[0]);
  };

  console.log(initialValues);
  return (
    <Box m="20px" align="center">
      <Header title="UPDATE USER" subtitle="Update user Data" />
      {!data ? (
        <CircularProgress size="3rem" sx={{ m: 8 }} />
      ) : (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box sx={{ gridColumn: "span 2" }} className="password-input2">
                  <TextField
                    fullWidth
                    variant="filled"
                    type={passwordType ? "text" : "password"}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                  <Box className="showPassword2" onClick={handelShowPassword}>
                    {passwordType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.DOB}
                  name="DOB"
                  error={!!touched.DOB && !!errors.DOB}
                  helperText={touched.DOB && errors.DOB}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  sx={{ gridColumn: "span 2" }}
                  name="image"
                  type="file"
                  label="Choose Picture"
                  fullWidth
                  variant="standard"
                  onChange={handleFileUpload}
                  value={values?.image}
                />
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{ gridColumn: "span 2" }}
                  >
                    User Role
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group role"
                    value={values.role}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      name="role"
                      control={<Radio />}
                      label="Admin "
                      value="admin"
                    />

                    <FormControlLabel
                      value="tailor"
                      control={<Radio />}
                      label="tailor"
                      name="role"
                    />
                    <FormControlLabel
                      value="cashier"
                      control={<Radio />}
                      label="cashier"
                      name="role"
                    />
                  </RadioGroup>
                  {errors.role && touched.role && (
                    <FormHelperText sx={{ color: "red" }} id="role">
                      {errors.role}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  {loading ? (
                    <CircularProgress
                      size="1.3rem"
                      sx={{
                        mx: 3,
                      }}
                    />
                  ) : (
                    <div> Update Now</div>
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default UpdateUser;
