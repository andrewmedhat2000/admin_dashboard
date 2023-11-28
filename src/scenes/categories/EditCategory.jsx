import { Button, TextField, Box } from "@mui/material";
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

const UpdateCategory = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance.get(`/category/getcategory/${id}`).then((response) => {
      // console.log(response.data.users);

      setData(response.data.category);
    });
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    name: data?.name,
  };
  console.log(data);
  const checkoutSchema = yup.object({
    name: yup.string().required("Required"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    setLoading(true);

    try {
      const formData = new FormData();
      image && formData.append("image", image);

      formData.append("name", values.name);

      await axiosInstance
        .patch(`/category/updatecategory/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response);
          setImage(null);
          setLoading(false);
          toast.success(response.data.message);
          resetForm();
          navigate("/categories");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          console.error("error: ", error);
        });
    } catch (error) {
      toast.success("Something wrong happened while Update Category");

      console.error("Error uploading file: ", error);
    }
  };
  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
    console.log("event", event.target.files[0]);
  };

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
                  value={values.name}
                  defaultValue={data?.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
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

export default UpdateCategory;
