import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductoForm from "../components/ProductoForm";
import { getProductos, updateProducto } from "../api/productos.api";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await getProductos();

        // 🔥 Manejo seguro (esto evita tu error)
        const productos = res.data?.data || res.data;

        const encontrado = productos.find(
          (p) => String(p.id) === id
        );

        setProducto(encontrado);

      } catch (error) {
        console.error("ERROR AL CARGAR:", error);
      }
    };

    fetchProducto();
  }, [id]);

  // 🔄 actualizar
  const handleUpdate = async (data) => {
    try {
      await updateProducto(id, data);
      navigate("/");
    } catch (error) {
      console.error("ERROR UPDATE:", error);
    }
  };

  // ⏳ loading
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <ProductoForm
      initialData={producto}
      onSubmit={handleUpdate}
    />
  );
}