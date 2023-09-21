import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  last_updated: yup.date().required(),
  product_id: yup.string().nullable().required(),
});
