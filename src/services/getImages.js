import { supabase } from "./createClient";

export const getImages = async () => {
  let { data, error } = await supabase.from("imageTable").select("*");

  if (error) {
    throw new Error("Error al obtener las fotos");
  }

  return data;
};
