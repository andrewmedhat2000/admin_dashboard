import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import "./SingleReport.css";
export default function SingleReport(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion
      //defaultExpanded
      style={{ marginBottom: "5px" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.greenAccent[500]} variant="h5">
          {props.i.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails style={{ columnCount: 4 }}>
        <div className="text">
          <h4>Time:</h4>
          {props?.i?.createdAt.slice(0, -8).replace("T", "  ")}
        </div>
        <div className="text">
          <h4>Client Name:</h4>
          {props?.i?.invoice?.clientName}
        </div>
        <div className="text">
          <h4>Client Phone:</h4>
          {props?.i?.invoice?.clientPhone}
        </div>
        <div className="text">
          <h4>Product Name:</h4>
          {props?.i?.invoice?.productName}
        </div>
        <div className="text">
          <h4>Items:</h4>
          {props?.i?.invoice?.numberOfItems}
        </div>
        <div className="text">
          <h4>Tailored:</h4>
          {props?.i?.invoice?.tailored}
        </div>
        <div className="text">
          <h4>Product Price:</h4>
          {props?.i?.invoice?.productPrice}
        </div>
        <div className="text">
          <h4>Tailoring Price:</h4>
          {props?.i?.invoice?.tailoringPrice}
        </div>
        <div className="text">
          <h4>Total Price:</h4>
          {props?.i?.invoice?.totalPrice}
        </div>
        <div className="text">
          <h4>Payment Method:</h4>
          {props?.i?.invoice?.paymentMethod}
        </div>
        <div className="text">
          <h4>Invoice Id:</h4>
          {props?.i?.invoice?.invoiceId}
        </div>
        <div className="text">
          <h4>User Name:</h4>
          {props?.i?.userName}
        </div>
        <div className="text">
          <h4>User ID:</h4>
          {props?.i?.userID}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
