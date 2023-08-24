import React from "react";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "#f6f6f6",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: "0.9rem", color: "black" }} />}
    {...props}
  />
))(({ theme }) => ({
  borderBottom: "1px solid #fce7f3",
  color: "black",
  flexDirection: "row",
  "&:hover": {
    backgroundColor: "#f0f0f0", // Set the background color on hover
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(45deg)",
  },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: "#f6f6f6",
  color: "black",
}));

export default function Faqs({ product }) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-2xl md:text-4xl text-bold text-center mb-5 mt-[5rem]"> Frequently Asked Questions </h1>
      <div className="text-gray-900">
        {product.faq.content.map((item, index) => (
          <Accordion
            key={`panel${index + 1}`}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <WbIncandescentIcon sx={{ marginRight: '0.5rem' }} />
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    
    </div>
  );
}