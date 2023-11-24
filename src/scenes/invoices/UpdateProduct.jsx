import {
  Button,
  TextField,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
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
const UpdateProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  const getCategory = () => {
    axiosInstance.get("/category/getallcategories").then((response) => {
      setCategory(response.data.categories.map((e) => e.name));
    });
  };

  useEffect(() => {
    getCategory();
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance.get(`/product/getproduct/${id}`).then((response) => {
      setData(response.data.product);
    });
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    name: data?.name,
    category: data?.categories,
    price: data?.price,
    discount: data?.discount,
    stock: data?.stock,
    color: data?.color,
    size: data?.size,
    barCodeNumber: data?.barCodeNumber,
  };

  const checkoutSchema = yup.object({
    name: yup.string().required("Required"),
    price: yup.string().required("Required"),
    stock: yup.string().required("Required"),
    color: yup.string().required("Required"),
    discount: yup.string().required("Required"),
    size: yup.string().required("Required"),
    barCodeNumber: yup.string().required("Required"),
    category: yup.array().required("Required"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);

    const formData = new FormData();

    image && formData.append("image", image);
    formData.append("name", values.name);
    values.category.forEach((item) => formData.append("categories", item));
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("stock", values.stock);
    formData.append("color", values.color);
    formData.append("size", values.size);
    formData.append("barCodeNumber", values.barCodeNumber);

    axiosInstance
      .patch(`/product/updateproduct/${id}`, formData, {
        headers: {
          "Content-Type": "application/form-data",
        },
      })
      .then((response) => {
        // console.log(response);
        // const newProduct = response.data.product;
        // let productIndex = data.findIndex(
        //   (product) => product._id === newProduct._id
        // );
        // console.log({ productIndex });
        // data[productIndex].name = newProduct.name;
        // data[productIndex].image = newProduct.image;
        setLoading(false);

        toast.success(response.data.message);
        resetForm();
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        //toast.error("Something wrong happened while Update Product");
        toast.error(error.response.data.message);
        console.error("error: ", error);
      });
  };
  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
    console.log("event", event.target.files[0]);
  };

  return (
    <Box m="20px" align="center">
      <Header title="UPDATE PRODUCT" subtitle="Update Product Data" />

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
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl sx={{ gridColumn: "span 2" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    multiple
                    name="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    input={<OutlinedInput label="Category" />}
                  >
                    {categories.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && touched.category && (
                    <FormHelperText sx={{ color: "red" }} id="category">
                      {errors.category}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box sx={{ gridColumn: "span 2" }} className="password-input2">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box
                    className="showPassword2"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "400",
                      right: "2rem",
                    }}
                  >
                    kWD
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  disabled
                  variant="filled"
                  type="number"
                  label="barCode Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.barCodeNumber}
                  name="barCodeNumber"
                  error={!!touched.barCodeNumber && !!errors.barCodeNumber}
                  helperText={touched.barCodeNumber && errors.barCodeNumber}
                  sx={{ gridColumn: "span 2" }}
                />{" "}
                <Box sx={{ gridColumn: "span 2" }} className="password-input2">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Discount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    name="discount"
                    error={!!touched.discount && !!errors.discount}
                    helperText={touched.discount && errors.discount}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box
                    className="showPassword2"
                    style={{ fontSize: "1.1rem", fontWeight: "400", top: "10" }}
                  >
                    %
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Stock"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.stock}
                  name="stock"
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Size"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.size}
                  name="size"
                  error={!!touched.size && !!errors.size}
                  helperText={touched.size && errors.size}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.color}
                  name="color"
                  error={!!touched.color && !!errors.color}
                  helperText={touched.color && errors.color}
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
                />
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

export default UpdateProduct;
