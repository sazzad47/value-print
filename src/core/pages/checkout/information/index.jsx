import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import { useCreatePaymentSessionMutation } from "../../../state/api/user";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const steps = [
  {
    label: "Billing Address",
    content: <BillingAddress />,
  },
  {
    label: "Shipping Address",
    content: <ShippingAddress />,
  },
  {
    label: "Payment",
    content: `Your Payment Information is Safe and Secure - We Do Not Save Your Payment Details`,
  },
];

export default function Information() {
  const { access_token } = useSelector((state) => state.global);
  const [createPaymentSession, { isLoading: sessionLoading }] =
    useCreatePaymentSessionMutation();

  const [orderData, setOrderData] = React.useState();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createSession = async () => {
    const response = await createPaymentSession({
      orderData,
      access_token,
    });
    if ("data" in response) {
      window.location.href = response.data.checkout_url;
      setOrderData('')
    }
  };

  return (
    <Box sx={{ backgroundColor: "#e5e7eb", color: "black", padding: "1rem" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "grey.500", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.500", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#701a75", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.500", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white", // circle's number (ACTIVE)
              },
            }}
          >
            <StepLabel>
              <Typography className="text-gray-900"> {step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.content}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    className="cursor-pointer inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                    onClick={
                      index === steps.length - 1 ? ()=> createSession() : handleNext
                    }
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {sessionLoading ? (
                      <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#b8c480",
                          "#B2A3B5",
                          "#F4442E",
                          "#51E5FF",
                          "#429EA6",
                        ]}
                      />
                    ) : index === steps.length - 1 ? (
                      "Continue with Stripe"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                  <Button
                    className="text-gray-900"
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
