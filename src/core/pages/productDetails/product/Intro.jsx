import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Faqs from "./Faqs";

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
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "black" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#fce7f3",
  color: "black",
  marginTop: "1rem",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: "#f6f6f6",
  color: "black",
}));

export default function Intro({ product }) {
  const [expanded, setExpanded] = React.useState(
    product.features.map((_, index) => `panel${index + 1}`)
  );

  const [initialVariantsExpanded, setInitialVariantsExpanded] =
    React.useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(
      newExpanded
        ? [...expanded, panel]
        : expanded.filter((item) => item !== panel)
    );

    if (panel === "variants") {
      setInitialVariantsExpanded(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-2xl sm:text-4xl text-bold text-center mb-5 mt-[3rem]">
        {" "}
        {product.name} Specifications{" "}
      </h1>
      <div className="text-gray-900">
        {product.features.map((item, index) => (
          <Accordion
            key={`panel${index + 1}`}
            expanded={expanded.includes(`panel${index + 1}`)}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <Typography>{item.placeholder}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {item.value.map((valueItem, valueIndex) => {
                  if (valueItem.photo === "") {
                    return (
                      <ul key={`value${valueIndex}`}>
                        <li>{valueItem.title}</li>
                      </ul>
                    );
                  } else {
                    return (
                      <div
                        key={`value${valueIndex}`}
                        className="flex flex-col gap-2"
                      >
                        <div className="w-full bg-gray-300 p-5 flex items-center justify-center">
                          <img
                            src={valueItem.photo}
                            alt=""
                            className="w-full aspect-auto"
                          />
                        </div>
                        <h3 className="font-semibold"> {valueItem.title} </h3>
                      </div>
                    );
                  }
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {product.variants.placeholder !== "" && (
        <div className="text-gray-900">
          <Accordion
            expanded={expanded.includes("variants") || initialVariantsExpanded}
            onChange={handleChange("variants")}
          >
            <AccordionSummary
              aria-controls="variants-content"
              id="variants-header"
            >
              <Typography>{product.variants.placeholder}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-gray-900">
                {product.variants.value.map((variant, variantIndex) => (
                  <div key={`variant${variantIndex}`}>
                    {variant.subvariant.placeholder === "" ? (
                      <ul>
                        <li>{variant.title}</li>
                      </ul>
                    ) : (
                      <Accordion
                        expanded={expanded.includes(`variant${variantIndex}`)}
                        onChange={handleChange(`variant${variantIndex}`)}
                      >
                        <AccordionSummary
                          aria-controls={`variant${variantIndex}-content`}
                          id={`variant${variantIndex}-header`}
                        >
                          <Typography>{variant.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {variant.subvariant.value.map(
                              (valueItem, valueIndex) => {
                                if (valueItem.photo === "") {
                                  return (
                                    <ul key={`value${valueIndex}`}>
                                      <li>{valueItem.title}</li>
                                    </ul>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={`value${valueIndex}`}
                                      className="flex flex-col gap-2"
                                    >
                                      <div className="w-full bg-gray-300 p-5 flex items-center justify-center">
                                        <img
                                          src={valueItem.photo}
                                          alt=""
                                          className="w-full aspect-auto"
                                        />
                                      </div>
                                      <h3 className="font-semibold">
                                        {" "}
                                        {valueItem.title}{" "}
                                      </h3>
                                    </div>
                                  );
                                }
                              }
                            )}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      )}

      <Faqs product={product} />
    </div>
  );
}
