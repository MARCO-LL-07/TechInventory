import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  deleteProducto,
  updateProducto
} from "../api/productos.api";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Obtener productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await getProductos();

      console.log("API RESPONSE:", res);

      // 🧠 Manejo seguro de datos
      const data = res?.data;

      if (Array.isArray(data)) {
        setProductos(data);
      } else if (data?.data && Array.isArray(data.data)) {
        // 🔥 por si backend devuelve { data: [...] }
        setProductos(data.data);
      } else {
        setProductos([]);
      }

    } catch (err) {
      console.error("ERROR GET:", err);
      setError("Error al cargar productos");
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Crear producto
  const addProducto = async (producto) => {
    try {
      const res = await createProducto(producto);

      console.log("CREATE RESPONSE:", res);

      const nuevo = res?.data;

      if (nuevo) {
        setProductos((prev) => [nuevo, ...prev]);
      }

    } catch (err) {
      console.error("ERROR CREATE:", err);
      setError("Error al crear producto");
    }
  };

  const editProducto = async (id, data) => {
    try {
        const res = await updateProducto(id, data);

        setProductos(prev =>
        prev.map(p => (p.id === id ? res.data : p))
        );

    } catch (error) {
        console.error("ERROR UPDATE:", error);
    }
    };

  // ❌ Eliminar producto
  const removeProducto = async (id) => {
    try {
      await deleteProducto(id);

      setProductos((prev) =>
        prev.filter((p) => p.id !== id)
      );

    } catch (err) {
      console.error("ERROR DELETE:", err);
      setError("Error al eliminar producto");
    }
  };

  // 🚀 Inicial
  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    addProducto,
    removeProducto,
    editProducto,
    refetch: fetchProductos 
  };
};