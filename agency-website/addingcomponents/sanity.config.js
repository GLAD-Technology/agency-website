import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import whyGladCard from './schemaTypes/whyGladCard'
import heroSection from './schemaTypes/heroSection'
import services from './schemaTypes/services'

export default defineConfig({
  name: 'default',
  title: 'addingcomponents',

  projectId: 'bf7gkebb',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [whyGladCard, heroSection, services],
  },
})
