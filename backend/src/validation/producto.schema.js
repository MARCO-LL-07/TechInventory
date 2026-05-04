import * as yup from "yup";

export const productoSchema = yup.object({
  nombre: yup.string().required(),
  categoria: yup.string().required(),
  precio: yup.number().positive().required(),
  stock: yup.number().integer().min(0).required()
});