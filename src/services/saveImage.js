import { supabase } from "./createClient";

// this file publishes the image  URL at the table
export const saveImage = async (fileName) => {
  const { data, error } = await supabase
    .from("imageTable")
    .insert([{ name: fileName }])
    .select();

  if (error) {
    // throw new Error("Error al guardar la imagen");
    throw new Error(error);
  }
};
