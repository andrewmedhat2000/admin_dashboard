import {
  Box,
  Button,
  CardMedia,
  FormHelperText,
  Paper,
  TextField,
} from '@mui/material';
import logo from '../../assets/pngwing.com.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './LoginForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginForm = () => {
  // const [_, { language }] = useTranslation();
  // const [signIn] = useSignInMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('*Should be a valid email')
        .required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      axios
        .post('https://andrew-demo.onrender.com/user/login', values)
        .then((res) => {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          navigate('/home');
        })
        .catch((e) => {
          toast.error('Something wrong happened while logining');
        });
    },
  });
  return (
    <Box className='login'>
      <Box className='login_box'>
        <Box className='left'>
          <Box className='contact'>
            <form onSubmit={formik.handleSubmit}>
              <h3>SIGN IN</h3>
              <input
                type='text'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='EMAIL'
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <FormHelperText sx={{ color: 'red' }} id='email'>
                  {formik.errors.email}
                </FormHelperText>
              )}
              <input
                type='text'
                placeholder='PASSWORD'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <FormHelperText sx={{ color: 'red' }} id='email'>
                  {formik.errors.password}
                </FormHelperText>
              )}
              <button className='submit' type='submit'>
                LET'S GO
              </button>
            </form>
          </Box>
        </Box>
        <Box className='right'>
          <Box className='right-text'>
            <h5>Welcome to your control panal </h5>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
