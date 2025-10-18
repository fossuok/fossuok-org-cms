export default {
  name: 'event',
  title: 'Event | Details',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(5).max(100),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(0).max(300),
    },
    {
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule: any) =>
            Rule.required().error('Alt text is required for accessibility'),
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule: any) => Rule.required().max(3).error('You can only add up to 3 tags'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Meetup', value: 'meetup'},
          {title: 'Session', value: 'session'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique identifier for the event, used in the URL. [fossuok.org/events/<slug-here>]',
      placeholder: 'event-hello-world',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // replace spaces with -
            .replace(/[^a-z0-9-]/g, '') // remove invalid chars
            .slice(0, 96),
      },
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'speaker'}],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1), // optional: at least 1 speaker
    },
    {
      name: 'startsAt',
      title: 'Starts At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (hours)',
      type: 'number',
      initialValue: 0,
      description: 'Enter duration in hours (e.g., 1.5 for 1 hour 30 minutes)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'speaker.firstName',
      startsAt: 'startsAt',
      media: 'cover',
      category: 'category',
    },
    prepare(selection: any) {
      const {title, startsAt, media, category} = selection

      const formattedDate = startsAt
        ? new Date(startsAt).toLocaleString('en-US', {
            dateStyle: 'medium',
          })
        : ''

      return {
        title: title,
        subtitle: category
          ? `${category}${formattedDate ? ` | ${formattedDate}` : ''}`
          : formattedDate
            ? `${formattedDate}`
            : '',
        media: media,
      }
    },
  },
}
