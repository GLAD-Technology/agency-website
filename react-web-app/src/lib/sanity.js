// sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'bf7gkebb',
  dataset: 'production',
  apiVersion: '2023-11-01',
  useCdn: true,
});

export { client, imageUrlBuilder };
