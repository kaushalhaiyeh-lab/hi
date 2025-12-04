import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
    name: 'default',
    title: 'Business Website CMS',

    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
