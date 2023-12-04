import { Box, useTheme, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { axiosInstance } from "../../config/axios";
import { useState, useEffect } from "react";
import SingleReport from "./SingleReport";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const FAQ = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ReportsList = reports.map((data) => {
    return <SingleReport i={data} key={data.id} title={data.title} />;
  });

  const getAllReports = async () => {
    setLoading(true);
    await axiosInstance.get(`/report/getallreports`).then((response) => {
      setReports(response.data.reports.reverse());
      console.log(response.data.reports);
      setLoading(false);
    });
  };
  useEffect(() => {
    getAllReports();
  }, []);
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: yup.object({
      startDate: yup.string().required("Required"),
      endDate: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axiosInstance
        .post("/report/getallreportsbydate", values)
        .then((res) => {
          console.log(res);

          setReports(res.data.reports.reverse());
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          toast.error(e.response.data.message);
        });
    },
  });
  const handelReSet = () => {
    getAllReports();
    formik.values.startDate = "";
    formik.values.endDate = "";
    console.log("done");
  };
  return (
    <Box m="20px">
      <Header title="Reports" subtitle="List Of Reports Page" />
      <form onSubmit={formik.handleSubmit}>
        <div className="reports-filter">
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="From"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.startDate}
            name="startDate"
            error={formik.touched.startDate && formik.errors.startDate}
            helperText={formik.touched.startDate && formik.errors.startDate}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="To"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.endDate}
            name="endDate"
            error={formik.touched.endDate && formik.errors.endDate}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
          <Button type="submit" color="secondary" variant="contained">
            Set
          </Button>
          <Button color="secondary" variant="contained" onClick={handelReSet}>
            ReSet
          </Button>
        </div>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress size="3rem" sx={{ m: 8 }} />
        ) : (
          <div>
            {reports.length > 0 ? (
              reports.map((data) => (
                <SingleReport i={data} key={data.id} title={data.title} />
              ))
            ) : (
              <h3 style={{ margin: "100px", textAlign: "center" }}>No Data</h3>
            )}
          </div>
        )}
      </div>
      {/* <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Your Favorite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            Some Random Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant='h5'>
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default FAQ;
