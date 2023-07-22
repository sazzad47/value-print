import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { ColorRing, Oval } from "react-loader-spinner";
import { useGetCategoriesQuery } from "../../state/api/product";
import { useSendContactEmailMutation } from "../../state/api/user";
import Swal from "sweetalert2";

const Contact = () => {
  const { data, isLoading } = useGetCategoriesQuery({});
  const [sendContactEmail, { isLoading: isSending }] =
    useSendContactEmailMutation();

  const initState = {
    name: "",
    email: "",
    contactNumber: "",
    printCategory: "",
    artworkReady: "",
    quantity: "",
    message: "",
  };

  const [formData, setFormData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendContactEmail({ formData });

    if ("data" in response) {
      Swal.fire({
        title: "Sent Successfully",
        text: "Thank you for contacting us, we will get back to you soon.",
        icon: "success",
        background: "white",
        color: "black",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-3",
          denyButton: "order-2",
        },
      });
      setFormData(initState);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="w-full bg-red-500">
          <div className="flex justify-center items-center">
            <div className="bg-white text-gray-900 text-center p-8 rounded shadow-md">
              <form onSubmit={handleSubmit}>
                <Typography className="font-bold text-xl">
                  Get a quote in as fast as 3 working hours!
                </Typography>
                <Grid container spacing={2} className="text-gray-900 mt-5">
                  <Grid item xs={12} md={6}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Contact Number"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      name="printCategory"
                      value={formData.printCategory}
                      onChange={handleChange}
                      placeholder="What do you like to print?"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    >
                      <option value="" disabled>
                        What do you like to print?
                      </option>
                      {data.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <select
                      name="artworkReady"
                      value={formData.artworkReady}
                      onChange={handleChange}
                      placeholder="Artwork Ready?"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    >
                      <option value="" disabled>
                        Artwork Ready?
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Quantity"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      className="min-h-[5rem] w-full outline-none bg-pink-100 border-0 px-3 py-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <button
                      type="submit" // Important: Set the button type to 'submit' to trigger form submission
                      className="mb-2 cursor-pointer inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      {isSending ? (
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
                      ) : (
                        "Send"
                      )}
                    </button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
