import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5s1f6jl3';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  reactCompiler: { target: '19' },
  // Hostname para deploy (solo minúsculas, guiones; sin espacios). URL: https://grupo-alternative-blog.sanity.studio
  studioHost: 'grupo-alternative-blog',
});
