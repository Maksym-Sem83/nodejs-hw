import { Joi, Segments } from "celebrate";
import { TAGS } from "../constans/tags.js";

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(``),
    tags: Joi.string().valid(...TAGS)

  }),
};
