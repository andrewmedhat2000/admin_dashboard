import { Box, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Delete, Edit } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AllPoducts = () => {
  const [products, setAllProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const handleOpen = () => {
    setIsOpen(!isOpen);
    Navigate('/addProduct');
  };
  const handleEdit = (params) => {
    console.log(params.row);
    Navigate(`/updateProduct/${params.row._id}`);
    // setOpenEdit(!openEdit);
  };
  const handleDelete = (params) => {
    axiosInstance
      .delete(`/product/deleteproduct/${params.row._id}`)
      .then((response) => {
        console.log(params.row._id);
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        toast.error('Something wrong happened');
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get('/product/getallproducts?page=1&pageSize=10')
      .then((response) => {
        console.log(response.data.products);
        const updatedData = response.data.products.map((item, index) => ({
          id: index + 1, // Generate a unique id for each row
          ...item,
        }));
        setAllProducts(updatedData);
      });
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
    },
    {
      field: 'color',
      headerName: 'Color',
      flex: 1,
    },
    {
      field: 'size',
      headerName: 'Size',
      flex: 1,
      // renderCell: (params) => (
      //   <Typography color={colors.greenAccent[500]}>
      //     ${params.row.cost}
      //   </Typography>
      // ),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 1,
    },
    {
      field: 'Edit',
      headerName: 'Update Product',
      width: 150,
      renderCell: (params) => (
        <>
          <Edit
            style={{ cursor: 'pointer', color: colors.grey[500] }}
            onClick={() => handleEdit(params)}
          />
        </>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete Product',
      width: 150,
      renderCell: (params) => (
        <>
          <Delete
            style={{ cursor: 'pointer', marginRight: 15, color: '#c30010' }}
            onClick={() => handleDelete(params)}
          />
        </>
      ),
    },
  ];

  return (
    <Box m='20px' sx={{ flexGrow: 1, mt: '50px', mr: '50px', ml: '50px' }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header
          title='All Poducts'
          subtitle='List of All Poducts for Future Reference'
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
            Add new product
          </Button>
        </Box>
      </Box>
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={products} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllPoducts;
