import { Button } from "@mui/material";
import { useCreatePaymentSessionMutation } from "src/state/api/it";
import { ColorRing } from "react-loader-spinner";
import { OrderDetailsProps } from "./Header";

const Pay: React.FC<OrderDetailsProps> = ({ data }) => {
  const [createPaymentSession, { isLoading }] =
    useCreatePaymentSessionMutation();

  const createCheckOutSession = async () => {
    const response = await createPaymentSession({ id: data.id });
    if ("data" in response) {
      window.location.href = response.data.checkout_url;
    }
  };

  return (
    <>
      <Button
        onClick={createCheckOutSession}
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
          "Pay"
        )}
      </Button>
    </>
  );
};

export default Pay;
