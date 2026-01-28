import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5s1f6jl3';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'alternative-blog',
  title: 'Blog Alternative',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
