import React from 'react';

const Information = () => {
  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Options:</h2>
      <p className="mb-4 text-gray-900">
        We accept the following payment methods: Credit Cards (Visa, Mastercard, American Express), Debit Cards, and
        PayPal. All transactions are processed securely to ensure the safety of your payment information.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Process:</h2>
      <ol className="list-decimal list-inside mb-4 text-gray-900">
        <li>Select your preferred payment method from the options provided.</li>
        <li>Fill in the required payment details, including card information or PayPal login.</li>
        <li>Review your order summary and ensure all details are accurate.</li>
        <li>Click "Submit" or "Pay Now" to proceed with the payment.</li>
        <li>Upon successful payment, you will receive a confirmation email with the details of your transaction.</li>
      </ol>

      <h2 className="text-2xl font-bold mb-4 text-gray-900">Security and Privacy:</h2>
      <p className="mb-4 text-gray-900">
        We prioritize the security and privacy of your payment information. We use industry-standard encryption protocols
        to safeguard your data during the payment process. Your payment details are not stored on our servers after the
        transaction is completed. We adhere to strict privacy policies and do not share your payment information with
        third parties.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Confirmation:</h2>
      <p className='text-gray-900'>
        Once your payment is successfully processed, you will receive a confirmation email. In case of any issues or
        discrepancies with your payment, our customer support team will reach out to assist you.
      </p>
    </div>
  );
};

export default Information;
