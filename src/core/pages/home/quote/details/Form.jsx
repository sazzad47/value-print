import { Grid } from "@mui/material";
import React, { useState } from "react";
import { ColorRing, Oval } from "react-loader-spinner";
import { useGetCategoriesQuery } from "../../../../state/api/product";
import { useSendQuoteEmailMutation } from "../../../../state/api/user";
import Swal from "sweetalert2";
import ImageUploader from "../../../../components/imageUplaoder";

const RequestForm = () => {
  const { data, isLoading } = useGetCategoriesQuery({});
  const [sendQuoteEmail, { isLoading: isSending }] =
    useSendQuoteEmailMutation();

  const initState = {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    print_category: "",
    sheet_type: "",
    delivery_date: "",
    is_ready_customer: "",
    budget: "",
    description: "",
    artFile: [],
  };

  const [formData, setFormData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState({});

  console.log("formdata", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendQuoteEmail({ formData });

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
        <div className="w-full">
          <div className="flex justify-center items-center">
            <div className="text-gray-900 text-center rounded">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} className="text-gray-900">
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      What do you like to print?
                    </label>
                    <select
                      name="print_category"
                      value={formData.print_category}
                      onChange={handleChange}
                      placeholder="What do you like to print?"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      {data.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Is it a loose sheet item?
                    </label>
                    <select
                      name="sheet_type"
                      value={formData.sheet_type}
                      onChange={handleChange}
                      placeholder="Artwork Ready?"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Description of quote
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your quote"
                      className="min-h-[5rem] w-full outline-none bg-pink-100 border-0 px-3 py-3"
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      When do you need the completed print?
                    </label>
                    <input
                      name="delivery_date"
                      type="date"
                      value={formData.delivery_date}
                      onChange={handleChange}
                      placeholder="Select a date"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3 py-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Budget?
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter your budget"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Are you ready to place the order if we meet your budget?
                    </label>
                    <select
                      name="is_ready_customer"
                      value={formData.is_ready_customer}
                      onChange={handleChange}
                      placeholder="Artwork Ready?"
                      className="h-[56px] w-full outline-none bg-pink-100 border-0 px-3"
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="flex items-start flex-col gap-2"
                  >
                    <label className="text-gray-800 font-semibold">
                      Upload File
                    </label>
                    <div className="upload-box rounded-md p-5 w-full sm:w-1/2">
                      <ImageUploader
                        userData={formData} // Make sure this is formData, not data or any other object
                        setUserData={setFormData}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        name="artFile" // Make sure this matches the property name in formData
                        multiple={true}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} className="w-full flex justify-start">
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

export default RequestForm;
