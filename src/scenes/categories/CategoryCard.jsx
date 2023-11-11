import React, { useState } from 'react';
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axios';
export default function CategoryCard(props) {
  const [categories, setAllCategories] = useState([]);
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const path = props.i.image.path;
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
  const handleEdit = (params) => {
    Navigate(`/updateCategory/${props.i._id}`);
    // setOpenEdit(!openEdit);
  };
  const handleDelete = () => {
    axiosInstance
      .delete(`/category/deletecategory/${props.i._id}`)
      .then((response) => {
        console.log(props.i._id);
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        toast.error('Something wrong happened');
      });
  };
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345, backgroundColor: colors.blueAccent[900] }}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image={path}
        />
        <CardContent>
          <Typography gutterBottom variant='h3' component='div'>
            {props.i.name}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button sx={{ color: colors.greenAccent[300] }}>Share</Button> */}
          <Button
            sx={{ color: colors.greenAccent[300] }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            sx={{ color: colors.greenAccent[300] }}
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
