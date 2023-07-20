import { Button } from "@mui/material";
import { useCreatePaymentSessionMutation } from "src/state/api/it";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";
import { OrderDetailsProps } from "./Header";

const Download: React.FC<OrderDetailsProps> = ({ data }) => {
  const remainingAmount = data.total_price - data.total_paid;
  const [createPaymentSession, { isLoading }] =
    useCreatePaymentSessionMutation();

  const createCheckOutSession = async () => {
    const response = await createPaymentSession({ id: data.id });
    if ("data" in response) {
      window.location.href = response.data.checkout_url;
    }
  };

  const OpenModal = () => {
    Swal.fire({
      title: "Access Denied!",
      text: `Please pay $${remainingAmount} as the remaining amount of total price to access the file.`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: `${isLoading ? "Loading..." : "Pay"}`,
      preConfirm: createCheckOutSession,
    });
  };

  const checkAccessibilty = () => {
    if (data.status !== "Completed") return OpenModal();
    window.open(data.design_file, "_blank");
  };

  return (
    <>
      <Button
        onClick={checkAccessibilty}
        variant="contained"
        size="small"
        className="px-2 py-1 capitalize cursor-pointer bg-neutral-500 hover:bg-neutral-600"
      >
        {isLoading ? (
          <ColorRing
            visible={true}
            height="25"
            width="25"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
          />
        ) : (
          "Download"
        )}
      </Button>
    </>
  );
};

export default Download;
