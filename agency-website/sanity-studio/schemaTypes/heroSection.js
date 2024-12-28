export default {
    name: 'heroSection',
    type: 'document',
    title: 'Hero Section',
    fields: [
      {
        name: 'backgroundImage',
        type: 'image',
        title: 'Background Image',
        options: {
          hotspot: true, // Allow cropping
        },
      },
      {
        name: 'titleLine1',
        type: 'string',
        title: 'First Line of Title',
      },
      {
        name: 'titleLine2',
        type: 'string',
        title: 'Second Line of Title',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
    ],
  };
  