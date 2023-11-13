import { Button, TextField, Box } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const AddCategory = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    if (!image) {
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", values.category);
      await axiosInstance
        .post("/category/addcategory", formData, {
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

          navigate("/categories");
        })
        .catch((error) => {
          setLoading(false);

          toast.error("Somthing Went Ronge");
          console.error("error: ", error);
        });
    } catch (error) {
      toast.error("Somthing Went Ronge");

      console.error("Error uploading file: ", error);
    }
  };
  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
    console.log("event", event.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title="CREATE CATEGORY" subtitle="Create New Category Data" />

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
                label="Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                required
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
                      mx: 6.3,
                    }}
                  />
                ) : (
                  <div> Create New Category</div>
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  category: "",
};

const checkoutSchema = yup.object({
  category: yup.string().required("Required"),
});

export default AddCategory;
