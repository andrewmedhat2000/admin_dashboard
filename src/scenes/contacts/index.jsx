import { Box, unstable_ClassNameGenerator, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserDetails from './UpdateUser';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
const Contacts = () => {
  const [users, setAllUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const handleOpen = () => {
    // setIsOpen(!isOpen);
    Navigate('/addUser');
  };
  const handleEdit = (params) => {
    console.log(params.row);
    Navigate(`/updateUser/${params.row._id}`);
    // setOpenEdit(!openEdit);
  };

  const handleDelete = (params) => {
    axiosInstance
      .delete(`/user/${params.row._id}`)
      .then((response) => {
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
    axiosInstance.get('/user/getallusers').then((response) => {
      // console.log(response.data.users);
      const updatedData = response.data.users.map((item, index) => ({
        id: index + 1, // Generate a unique id for each row
        ...item,
      }));
      setAllUsers(updatedData);
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'Edit',
      headerName: 'Update User',
      width: 150,
      renderCell: (params) => (
        <>
          <ManageAccountsIcon
            style={{ cursor: 'pointer', color: colors.grey[500] }}
            onClick={() => handleEdit(params)}
          />
          {/* <UserDetails
            FormOpened={openEdit}
            handleCloseDialog={() => setOpenEdit(false)}
            props={params}
          /> */}
        </>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete User',
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
          title='Users'
          subtitle='List of All Users for Future Reference'
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
            <PersonAddIcon sx={{ mr: '10px' }} />
            Add new user
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
            // backgroundColor: colors.primary[400],
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
