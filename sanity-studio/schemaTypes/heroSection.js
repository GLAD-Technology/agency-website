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
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'titleLine1',
        type: 'string',
        title: 'First Line of Title',
        validation: (Rule) => Rule.required().min(5),
      },
      {
        name: 'titleLine2',
        type: 'string',
        title: 'Second Line of Title',
        validation: (Rule) => Rule.required().min(5),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        validation: (Rule) => Rule.required().min(10),
      },
    ],
    preview: {
      select: {
        title: 'titleLine1',
        subtitle: 'titleLine2',
        media: 'backgroundImage'
      }
    }
  };