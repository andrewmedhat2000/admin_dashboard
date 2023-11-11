import { Button, TextField, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axios';
import { useState } from 'react';

const AddProduct = () => {
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
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('discount', values.discount);
      formData.append('stock', values.stock);
      formData.append('color', values.color);
      formData.append('size', values.size);
      await axiosInstance
        .post('/product/addproduct', formData, {
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
      <Header title='ADD PRODUCT' subtitle='ADD New Product Data' />

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
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Category'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name='category'
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Price'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name='price'
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Discount'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discount}
                name='discount'
                error={!!touched.discount && !!errors.discount}
                helperText={touched.discount && errors.discount}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Stock'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stock}
                name='stock'
                error={!!touched.stock && !!errors.stock}
                helperText={touched.stock && errors.stock}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Size'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.size}
                name='size'
                error={!!touched.size && !!errors.size}
                helperText={touched.size && errors.size}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='color'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.color}
                name='color'
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
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
                Add Product
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
  category: '',
  price: '',
  discount: '',
  stock: '',
  color: '',
  size: '',
};

const checkoutSchema = yup.object({
  name: yup.string().required('Required'),
  category: yup.string().required('Array field is required'),
  price: yup.string().required('Required'),
  discount: yup.string().required('Required'),
  stock: yup.string().required('Required'),
  color: yup.string().required('Required'),
  size: yup.string().required('Required'),
});

export default AddProduct;
