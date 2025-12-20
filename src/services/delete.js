import { supabase } from "./createClient";

export const deleteImage = async ({ id }) => {
  const { error } = await supabase.from("imageTable").delete().eq("id", id);

  if (error) {
    throw new Error("Error al borrar en la tabla");
  }

  return true;
};
