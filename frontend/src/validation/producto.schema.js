import * as yup from "yup";

export const productoSchema = yup.object({
  nombre: yup
    .string()
    .required("El nombre es obligatorio"),

  categoria: yup
    .string()
    .required("La categoría es obligatoria"),

  precio: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("El precio es obligatorio"),

  stock: yup
    .number()
    .typeError("Debe ser un número")
    .integer("Debe ser entero")
    .min(0, "No puede ser negativo")
    .required("El stock es obligatorio")
});