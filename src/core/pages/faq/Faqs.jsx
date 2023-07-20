import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary[700],
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: 'white',
  color: 'black',
}));

const faqsData = [
  {
    question: 'How do I place an order?',
    answer: (
      <ul className='px-3'>
        <li>Browse our products and select the items you wish to purchase.</li>
        <li>Add the items to your cart and proceed to checkout.</li>
        <li>Provide the required information, including shipping address and payment details.</li>
        <li>Review your order summary and click "Submit" to complete the order.</li>
        <li>You will receive an order confirmation email with the details of your purchase.</li>
      </ul>
    ),
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods, including Credit Cards (Visa, Mastercard, American Express), Debit Cards, and PayPal. You can choose your preferred payment option during the checkout process.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'The shipping time may vary depending on your location and the shipping method chosen. Typically, orders are processed and shipped within 1-3 business days. Once shipped, the estimated delivery time will be provided in the shipping confirmation email.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We have a hassle-free return policy. If you are not satisfied with your purchase, you can return the item(s) within 30 days of delivery for a refund or exchange. Please refer to our Returns and Refunds page for more detailed information on our return process.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'Our customer support team is available to assist you with any questions or concerns. You can reach out to us through our contact form on the Contact Us page, or you can email us directly at support@example.com. We aim to respond to all inquiries within 24 hours.',
  },
];


export default function Faqs() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='text-gray-900'>
        {faqsData.map((item, index) => (
          <Accordion
            key={`panel${index + 1}`}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
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
