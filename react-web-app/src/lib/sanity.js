// sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'bf7gkebb',
  dataset: 'production',
  apiVersion: '2025-05-26',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiHost: 'https://react-web-app-lemon.vercel.app'
});

const imageBuilder = imageUrlBuilder(client);

export { client, imageBuilder };
