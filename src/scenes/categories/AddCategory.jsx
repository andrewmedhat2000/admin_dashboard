import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axios';
import { useState } from 'react';

const AddCategory = () => {
  const [image, setImage] = useState(null);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    if (!image) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', values.name);
      await axiosInstance
        .post('/category/addcategory', formData, {
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
      <Header title='CREATE CATEGORY' subtitle='Create New Category Data' />

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
                label='Category Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                Create New Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  name: '',
};

const checkoutSchema = yup.object({
  name: yup.string().required('Required'),
});

export default AddCategory;
