export default {
    name: "service",
    title: "Services",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Service Title",
        type: "string",
        validation: (Rule) => Rule.required().min(5).max(100),
      },
      {
        name: "description",
        title: "Service Description",
        type: "text",
        validation: (Rule) => Rule.required().min(10).max(200),
      },
      {
        name: "image",
        title: "Service Image",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  