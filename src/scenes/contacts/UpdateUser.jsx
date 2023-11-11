import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(id);
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance.get(`/user/getuser/${id}`).then((response) => {
      // console.log(response.data.users);

      setData(response.data.user);
    });
  };
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const initialValues = {
    name: data?.name,
    phone: data?.phone,
  };

  const checkoutSchema = yup.object({
    name: yup.string().required('Required'),
    phone: yup.string().required('Required'),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    if (!image) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      await axiosInstance
        .patch(`/user/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // console.log(response);
          setImage(null);
          toast.success(response.data.message);
          resetForm();
        })
        .catch((error) => {
          console.error('error: ', error);
        });
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };
  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
    console.log('event', event.target.files[0]);
  };

  return (
    <Box m='20px'>
      <Header title='UPDATE USER' subtitle='Update user Data' />

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
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                defaultValue={data?.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Phone'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={data?.phone}
                value={values.phone}
                name='phone'
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                sx={{ gridColumn: 'span 2' }}
                name='image'
                type='file'
                label='Choose Picture'
                fullWidth
                variant='standard'
                onChange={handleFileUpload}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Update Now
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateUser;
