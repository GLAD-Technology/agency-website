import {defineType} from 'sanity'
export default  {
  name: 'whyGladCard',
  title: 'Why GLAD Cards',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Desktop', value: 'faDesktop'},
          {title: 'Globe', value: 'faGlobe'},
          {title: 'Handshake', value: 'faHandshake'},
          {title: 'Clipboard Check', value: 'faClipboardCheck'},
        ],
      },
    },
  ],
}
