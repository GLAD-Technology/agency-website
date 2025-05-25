// sanity.js
import { createClient, urlFor } from "@sanity/client";

const client = createClient({
  projectId: "bf7gkebb",
  dataset: "production",
  apiVersion: "2023-11-01",
  useCdn: true,
});

export const imageUrlBuilder = urlFor;

export default client; // Default export
