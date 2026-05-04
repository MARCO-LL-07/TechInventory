import * as service from "../services/productos.service.js";
import { productoSchema } from "../validation/producto.schema.js";


// 🔹 GET TODOS
export const getAll = async (req, res) => {
  try {
    const productos = await service.getProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      message: "Error al obtener productos"
    });
  }
};


// 🔹 CREATE
export const create = async (req, res) => {
  try {
    // Validación Yup
    await productoSchema.validate(req.body, { abortEarly: false });

    const nuevoProducto = await service.createProducto(req.body);

    res.status(201).json(nuevoProducto);

  } catch (error) {
    console.error("CREATE ERROR:", error);

    // Error de validación
    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: error.errors
      });
    }

    res.status(500).json({
      message: "Error al crear producto"
    });
  }
};


// 🔹 UPDATE
export const update = async (req, res) => {
  try {
    const id = req.params.id;

    await productoSchema.validate(req.body, { abortEarly: false });

    const actualizado = await service.updateProducto(id, req.body);

    res.status(200).json(actualizado);

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        errors: error.errors
      });
    }

    res.status(500).json({
      message: "Error al actualizar producto"
    });
  }
};


// 🔹 DELETE
export const remove = async (req, res) => {
  try {
    const id = req.params.id;

    await service.deleteProducto(id);

    res.status(200).json({
      message: "Producto eliminado correctamente"
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Error al eliminar producto"
    });
  }
};
