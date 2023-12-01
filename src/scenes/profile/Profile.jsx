import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { axiosInstance } from '../../config/axios';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setuser } from '../../store/Actions/userAction';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [isActive, setActive] = useState(true);
  const [isUpdated, setUpdated] = useState(true);
  const toggleClass = () => {
    setActive(!isActive);
    setUpdated(!isUpdated);
  };

  useEffect(() => {
    axiosInstance.get(`/user/profile`).then((response) => {
      console.log(response.data.user.image.path);
      dispatch(setuser(response.data.user));
    });
  }, []);

  return (
    <Box m='20px'>
      <Header title='Admin Profile' subtitle='Settings of Admin Profile' />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ maxWidth: 345, mt: '100px' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='140'
              image={user.image?.path}
              alt='User Image'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {user.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {user.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {user._id}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button size='small' color='primary'>
              Edit
            </Button> */}
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
