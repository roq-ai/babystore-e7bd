import * as yup from 'yup';

export const billingValidationSchema = yup.object().shape({
  amount_due: yup.number().integer().required(),
  due_date: yup.date().required(),
  payment_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  purchase_id: yup.string().nullable().required(),
});
