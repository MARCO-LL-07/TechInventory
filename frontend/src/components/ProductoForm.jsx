import { useState } from "react";
import { productoSchema } from "../validation/producto.schema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProductoForm({ onSubmit, initialData }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: ""
  });

  useEffect(() => {
    if (initialData) {
        setForm({
        nombre: initialData.nombre || "",
        categoria: initialData.categoria || "",
        precio: initialData.precio || "",
        stock: initialData.stock || ""
        });
    }
    }, [initialData]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "precio" || name === "stock"
          ? value === "" ? "" : Number(value)
          : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productoSchema.validate(form, { abortEarly: false });

      setErrors({});
      await onSubmit(form);

    } catch (err) {
      const newErrors = {};

      if (err?.inner?.length) {
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
      }

      setErrors(newErrors);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Registrar Producto</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <p style={styles.error}>{errors.nombre}</p>

        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          style={styles.input}
        />
        <p style={styles.error}>{errors.categoria}</p>

        <input
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          style={styles.input}
        />
        <p style={styles.error}>{errors.precio}</p>

        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          style={styles.input}
        />
        <p style={styles.error}>{errors.stock}</p>

        <div style={styles.actions}>
          <button type="submit" style={styles.buttonPrimary}>
            Guardar
          </button>

          <button
            type="button"
            style={styles.buttonSecondary}
            onClick={() => navigate("/")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    padding: "20px" 
  },

  form: {
    width: "100%",
    maxWidth: "420px",
    padding: "25px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    boxSizing: "border-box" 
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box", 
    transition: "0.2s"
  },

  error: {
    color: "#e11d48",
    fontSize: "12px",
    marginBottom: "10px"
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  },

  buttonPrimary: {
    flex: 1,
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  buttonSecondary: {
    flex: 1,
    padding: "10px",
    background: "#e5e7eb",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};