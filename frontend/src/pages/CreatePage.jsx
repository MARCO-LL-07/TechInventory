import ProductoForm from "../components/ProductoForm";
import { useProductos } from "../hooks/useProductos";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const { addProducto } = useProductos();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    console.log("ENVIANDO:", data);

    try {
      await addProducto(data);
      console.log("GUARDADO OK");

      navigate("/");
    } catch (error) {
      console.error("ERROR CREATE:", error);
    }
  };

  return <ProductoForm onSubmit={handleCreate} />;
}