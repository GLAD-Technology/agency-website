import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import whyGladCard from './schemaTypes/whyGladCard'
import heroSection from './schemaTypes/heroSection'
import services from './schemaTypes/services'

export default defineConfig({
  name: 'default',
  title: 'Glad Agency Studio',
  apiVersion: '2025-05-26',
  basePath: '/studio',
  useCdn: true,
  usePreview: true,

  projectId: 'bf7gkebb',
  dataset: 'production',
  token: process.env.SANITY_STUDIO_TOKEN,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [whyGladCard, heroSection, services],
  },
})
