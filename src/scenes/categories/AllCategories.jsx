import { Box, useTheme, Button, Grid } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';

const AllCategories = () => {
  const [categories, setAllCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleOpen = () => {
    Navigate('/addCategory');
  };
  const CategoriesList = categories.map((data) => {
    return <CategoryCard i={data} key={data.id} title={data.title} />;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance.get('/category/getallcategories').then((response) => {
      console.log(response.data.categories);
      const updatedData = response.data.categories.map((item, index) => ({
        id: index + 1, // Generate a unique id for each row
        ...item,
      }));
      setAllCategories(updatedData);
    });
  };

  return (
    <Box m='20px' sx={{ flexGrow: 1, mt: '50px', mr: '50px', ml: '50px' }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header
          title='All Categories'
          subtitle='List of All Categories for Future Reference'
        />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '20px',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              },
            }}
            onClick={() => handleOpen()}
          >
            <AddShoppingCartIcon sx={{ mr: '10px' }} />
            Add new Category
          </Button>
        </Box>
      </Box>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: '50px' }}
      >
        {CategoriesList}
      </Grid>
    </Box>
  );
};

export default AllCategories;
