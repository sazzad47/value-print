import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

const Ribbon = ({ content }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box
      sx={{
        width: "70%",
        position: "relative",
        margin: "0 auto 20px",
        padding: "10px 40px",
        textAlign: "center",
        backgroundColor: theme.palette.primary[800],
        fontSize: isNonMobile? "1.5rem":"1.2rem",
        fontWeight: "bold",
        "::before": {
          content: '""',
          width: "80px",
          height: "100%",
          backgroundColor: theme.palette.primary[600],
          position: "absolute",
          zIndex: -1,
          top: "20px",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 25% 50%)",
          backgroundImage: `linear-gradient(45deg, transparent 50%, ${theme.palette.primary[800]} 50%)`,
          backgroundSize: "20px 20px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          left: "-60px",
        },
        "::after": {
          content: '""',
          width: "80px",
          height: "100%",
          backgroundColor: theme.palette.primary[600],
          position: "absolute",
          zIndex: -1,
          top: "20px",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 25% 50%)",
          backgroundImage: `linear-gradient(45deg, transparent 50%, ${theme.palette.primary[800]} 50%)`,
          backgroundSize: "20px 20px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          right: "-60px",
          transform: "scaleX(-1)",
        },
      }}
    >
      {content}
    </Box>
  );
};

export default Ribbon;
