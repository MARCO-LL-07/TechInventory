import supabase from '../config/supabaseClient.js';

// GET
export const getProductos = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// POST
export const createProducto = async (producto) => {
  const { data, error } = await supabase
    .from('productos')
    .insert([producto])
    .select();

  if (error) throw error;
  return data[0];
};

// PUT
export const updateProducto = async (id, producto) => {
  const { data, error } = await supabase
    .from('productos')
    .update(producto)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

// DELETE
export const deleteProducto = async (id) => {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

