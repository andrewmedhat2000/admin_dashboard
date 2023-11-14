import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Delete, Edit } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
const AllPoducts = () => {
  const [products, setAllProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    Navigate("/addProduct");
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
        toast.error("Something wrong happened");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get("/product/getallproducts?page=1&pageSize=10")
      .then((response) => {
        const updatedData = response.data.products.map((item, index) => ({
          id: index + 1, // Generate a unique id for each row
          ...item,
        }));
        setAllProducts(updatedData);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const addDiscound = (params) => {
    console.log(params.row._id);
    axiosInstance
      .patch(`/product/changeisdiscount/${params.row._id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  const handelDiscound = (params) => {
    var discount;
    var priceAfterDiscound;

    if (params.row.isDiscount === true && params.row.discount > 0) {
      discount = (params.row.price * params.row.discount) / 100;
      priceAfterDiscound = params.row.price - discount;
      return (
        <div>
          {" "}
          <del>{params.row.price}</del>
          <div>{priceAfterDiscound}</div>
        </div>
      );
    } else {
      return <div>{params.row.price}</div>;
    }
  };

  const QrCodeDownload = async (params) => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      const a = document.createElement("a");

      a.download = `QrCode${params.row.name}.png`;
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <>
          <dev>{handelDiscound(params)}</dev>
          {!params.row.isDiscount ? (
            <AddCircleOutlineIcon
              style={{
                cursor: "pointer",
                color: colors.grey[500],
                marginLeft: "auto",
              }}
              onClick={() => addDiscound(params)}
            />
          ) : (
            <RemoveCircleOutlineIcon
              style={{
                cursor: "pointer",
                color: colors.grey[500],
                marginLeft: "auto",
              }}
              onClick={() => addDiscound(params)}
            />
          )}
        </>
      ),
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
    },
    {
      field: "size",
      headerName: "Size",
      flex: 0.7,
      // renderCell: (params) => (
      //   <Typography color={colors.greenAccent[500]}>
      //     ${params.row.cost}
      //   </Typography>
      // ),
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.7,
    },
    {
      field: "categories",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => (
        <Box>
          {params.row.categories.map((e) => (
            <Box>{e}</Box>
          ))}
        </Box>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      editable: true,
      renderCell: (params) => (
        <img src={params.row.image.path} alt="img" style={{ width: 50 }} />
      ),
    },
    {
      field: "qr",
      headerName: "QR",
      width: 65,
      renderCell: (params) => (
        <div
          id="canvas"
          onClick={() => QrCodeDownload(params)}
          style={{ cursor: "pointer" }}
        >
          <QRCodeCanvas value={params.row.barCodeNumber} size={55} />
        </div>
      ),
    },
    {
      field: "Edit",
      headerName: "Update Product",
      width: 75,
      renderCell: (params) => (
        <>
          <Edit
            style={{ cursor: "pointer", color: colors.grey[500] }}
            onClick={() => handleEdit(params)}
          />
        </>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete Product",
      width: 75,
      renderCell: (params) => (
        <>
          <Delete
            style={{ cursor: "pointer", marginRight: 15, color: "#c30010" }}
            onClick={() => handleDelete(params)}
          />
        </>
      ),
    },
  ];

  return (
    <Box m="20px" sx={{ flexGrow: 1, mt: "50px", mr: "50px", ml: "50px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="All Poducts"
          subtitle="List of All Poducts for Future Reference"
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
            Add new product
          </Button>
        </Box>
      </Box>
      <Box
        align="center"
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading ? (
          <CircularProgress size="3rem" sx={{ m: 8 }} />
        ) : (
          <DataGrid checkboxSelection rows={products} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default AllPoducts;
