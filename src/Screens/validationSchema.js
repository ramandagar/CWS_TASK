// validationSchema.js
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  invoiceNo: Yup.string().required('Invoice No is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  invoiceDate: Yup.date().required('Invoice Date is required'),
  discountType: Yup.string().required('Discount Type is required'),
  discount: Yup.number().required('Discount is required'),
  duedate: Yup.date().required('Due Date is required'),
  currencies: Yup.string().required('Currencies is required'),
  product: Yup.string().required('Product is required'),
});

export default validationSchema;
