import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5s1f6jl3';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  reactCompiler: { target: '18' },
});
