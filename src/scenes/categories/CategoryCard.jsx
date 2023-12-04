import {
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

export default function CategoryCard(props) {
  const Navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const path = props.i.image.path;

  const handleEdit = (params) => {
    Navigate(`/updateCategory/${props.i._id}`);
    // setOpenEdit(!openEdit);
  };

  // const handleDelete = () => {
  //   axiosInstance
  //     .delete(`/category/deletecategory/${props.i._id}`)
  //     .then((response) => {
  //       console.log(props.i._id);
  //       toast.success(response.data.message);
  //     })
  //     .then(() => {
  //       fetchData();
  //     })
  //     .catch((error) => {
  //       toast.error("Something wrong happened");
  //     });
  // };
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        sx={{ maxWidth: 345, backgroundColor: colors.blueAccent[900], mb: 3 }}
      >
        <CardMedia
          style={{ height: "23rem" }}
          component="img"
          alt="green iguana"
          height="140"
          image={path}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {props.i.name}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button sx={{ color: colors.greenAccent[300] }}>Share</Button> */}
          <Button
            sx={{ color: colors.greenAccent[300] }}
            onClick={() => props.handleDelete(props.i._id)}
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
