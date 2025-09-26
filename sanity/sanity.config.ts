import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";

// ⬇️ named import (kurung kurawal), path: './schemaTypes'
import {schemaTypes} from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Sistem Informasi TUNAS ESTA INDONESIA",
  projectId: "g022i6r9",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
