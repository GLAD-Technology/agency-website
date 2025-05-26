import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import whyGladCard from './schemaTypes/whyGladCard'
import heroSection from './schemaTypes/heroSection'
import services from './schemaTypes/services'

export default defineConfig({
  name: 'default',
  title: 'Glad Agency Studio',
  apiVersion: '2023-11-01',
  basePath: '/studio',
  useCdn: true,

  projectId: 'bf7gkebb',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [whyGladCard, heroSection, services],
  },
})
