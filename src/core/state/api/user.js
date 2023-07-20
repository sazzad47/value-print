import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_BACKEND_URL}/api/user/auth/`,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "token/refresh/",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "register/",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    activateAccount: builder.mutation({
      query: (data) => ({
        url: `verify-email/${data.otp}/`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login/",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "changepassword/",
        method: "POST",
        body: userData,
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ userData, token, id }) => ({
        url: `reset-password/${id}/${token}/`,
        method: "POST",
        body: userData,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (data) => ({
        url: "send-reset-password-email/",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    createBillingAddress: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "billing-address/",
        method: "POST",
        body: userData,
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateBillingAddress: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "billing-address/update/",
        method: "PUT",
        body: userData,
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getBillingAddress: builder.query({
      query: ({ access_token }) => ({
        url: "billing-address/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ userData, access_token }) => {
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        return {
          url: "profile/update/",
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getProfile: builder.query({
      query: ({ access_token }) => ({
        url: "profile/detail/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ userData, access_token }) => {
        const formData = new FormData();
        for (const key in userData) {
          const value = userData[key];
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (value instanceof Date) {
            formData.append(key, value.toISOString().slice(0, 10));
          } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }

        return {
          url: "orders/create/",
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateOrder: builder.mutation({
      query: ({ userData, access_token, id }) => {
        const formData = new FormData();
        for (const key in userData) {
          const value = userData[key];
          if (value instanceof File) {
            formData.append(key, value, value.name);
          } else if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (value instanceof Date) {
            formData.append(key, value.toISOString().slice(0, 10));
          } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }

        return {
          url: `orders/edit/${id}/`,
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    createPaymentSession: builder.mutation({
      query: ({ orderData, access_token }) => ({
        url: `create-payment/`,
        method: "POST",
        body: orderData,
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getOrders: builder.query({
      query: ({ access_token }) => ({
        url: "orders/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ access_token, id }) => ({
        url: `orders/${id}/`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getTransactions: builder.query({
      query: ({ access_token }) => ({
        url: "transactions/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});
  

export const {
  useRefreshTokenMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useSendPasswordResetEmailMutation,
  useActivateAccountMutation,
  useGetBillingAddressQuery,
  useCreateBillingAddressMutation,
  useUpdateBillingAddressMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateOrderMutation,
  useCreatePaymentSessionMutation,
  useGetOrderDetailsQuery,
  useGetOrdersQuery,
  useGetTransactionsQuery,
  useUpdateOrderMutation,

} = userApi;
