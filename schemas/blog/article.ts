export default {
  name: 'article',
  title: 'Articles',
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
      validation: (Rule: any) => Rule.required().max(5).error('You can only add up to 5 tags'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Event', value: 'event'},
          {title: 'News', value: 'news'},
          {title: 'Announcement', value: 'announcement'},
          {title: 'Case Study', value: 'case-study'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Review', value: 'review'},
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
        'A unique identifier for the article, used in the URL. [fossuok.org/blog/<slug-here>]',
      placeholder: 'my-first-article',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'modifiedAt',
      title: 'Modified At',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule: any) =>
        Rule.required().custom((modifiedAt: any, context: any) => {
          const publishedAt = context?.document?.publishedAt
          if (!modifiedAt || !publishedAt) return true

          // Compare directly—no need to normalize
          if (new Date(modifiedAt).getTime() < new Date(publishedAt).getTime()) {
            return 'Modified date must be equal to or later than Published date.'
          }
          return true
        }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.firstName',
      modifiedAt: 'modifiedAt',
      media: 'cover',
    },
    prepare(selection: any) {
      const {title, author, modifiedAt, media} = selection

      const formattedDate = modifiedAt
        ? new Date(modifiedAt).toLocaleString('en-US', {
            dateStyle: 'medium',
          })
        : ''

      return {
        title: title,
        subtitle: author
          ? `${author}${formattedDate ? ` | ${formattedDate}` : ''}`
          : formattedDate
            ? `${formattedDate}`
            : '',
        media: media,
      }
    },
  },
}
