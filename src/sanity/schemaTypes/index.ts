import { type SchemaTypeDefinition } from "sanity";
import sanitySchemas from "../../../sanity/schemas";

// Gunakan kumpulan schema di folder /sanity/schemas (termasuk object types)
export const schema: { types: SchemaTypeDefinition[] } = {
  types: sanitySchemas as unknown as SchemaTypeDefinition[],
};
