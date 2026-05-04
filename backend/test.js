import supabase from "./src/config/supabaseClient.js";

// 🔥 TEST INSERT
const testInsert = async () => {
  const { data, error } = await supabase
    .from("productos")
    .insert([
      {
        nombre: "Laptop",
        categoria: "Hardware",
        precio: 3000,
        stock: 5
      }
    ])
    .select(); // 🔥 IMPORTANTE

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);
};

// 🔥 TEST SELECT
const testSelect = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select("*");

  console.log("SELECT DATA:", data);
  console.log("SELECT ERROR:", error);
};

// Ejecutar pruebas
const runTests = async () => {
  console.log("===== INSERTANDO =====");
  await testInsert();

  console.log("===== CONSULTANDO =====");
  await testSelect();
};

runTests();