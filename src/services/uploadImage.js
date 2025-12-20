import { supabase } from "./createClient";

export const uploadImage = async ({ image }) => {
  const id = crypto.randomUUID();
  const arrayBuffer = await image.arrayBuffer();
  const fileName = `${id}-${image.name}`;

  const { error } = await supabase.storage
    .from("fotos")
    .upload(`public/${fileName}`, arrayBuffer, {
      contentType: image.type,
      upsert: false,
    });

  if (error) {
    // throw new Error("Error al subir la imagen");
    throw new Error(error);
  }

  return fileName;
};
