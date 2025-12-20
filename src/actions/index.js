import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { uploadImage } from "../services/uploadImage";
import { saveImage } from "../services/saveImage";
import { getImages } from "../services/getImages";
import { deleteImage } from "../services/delete";

export const server = {
  uploadImage: defineAction({
    accept: "form",
    input: z.object({
      image: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
          message: "La imagen es obligatoria",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "El archivo debe ser una imagen",
        }),
    }),
    async handler({ image }) {
      try {
        console.log(image);

        const fileName = await uploadImage({ image });
        await saveImage(fileName);

        // en caso de que no haya errores:
        return {
          success: true,
          message: "imagen guardada",
        };
      } catch (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error,
        });
      }
    },
  }),

  getImages: defineAction({
    async handler() {
      try {
        const data = await getImages();

        console.log("esta es la dataaaaaaaaaa");
        console.log(data);

        return {
          success: true,
          data: data,
        };
      } catch (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error,
        });
      }
    },
  }),

  deleteImage: defineAction({
    async handler({ id }) {
      try {
        await deleteImage({ id });

        return {
          success: true,
          data: {
            message: "foto Borrada correctamente",
          },
        };
      } catch (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error,
        });
      }
    },
  }),
};
