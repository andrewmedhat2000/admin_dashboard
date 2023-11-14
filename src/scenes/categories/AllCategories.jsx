import { Box, useTheme, Button, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const AllCategories = () => {
  const [categories, setAllCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleOpen = () => {
    Navigate("/addCategory");
  };
  const handleDelete = (id) => {
    axiosInstance
      .delete(`/category/deletecategory/${id}`)

      .then((response) => {
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);

        toast.error("Something wrong happened");
      });
  };
  const CategoriesList = categories.map((data) => {
    return (
      <CategoryCard
        i={data}
        key={data.id}
        title={data.title}
        handleDelete={handleDelete}
      />
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get("/category/getallcategories").then((response) => {
      const updatedData = response.data.categories.map((item, index) => ({
        id: index + 1, // Generate a unique id for each row
        ...item,
      }));
      setLoading(false);

      setAllCategories(updatedData);
    });
  };
  return (
    <Box
      m="20px"
      sx={{ flexGrow: 1, mt: "50px", mr: "50px", ml: "50px" }}
      align="center"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="All Categories"
          subtitle="List of All Categories for Future Reference"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "20px",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              },
            }}
            onClick={() => handleOpen()}
          >
            <AddShoppingCartIcon sx={{ mr: "10px" }} />
            Add new Category
          </Button>
        </Box>
      </Box>
      {loading ? (
        <CircularProgress size="3rem" sx={{ m: 8 }} />
      ) : (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mt: "50px" }}
        >
          {CategoriesList}
        </Grid>
      )}
    </Box>
  );
};

export default AllCategories;
