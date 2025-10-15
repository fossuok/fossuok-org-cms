export default {
  name: 'article',
  title: 'Article',
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
      name: 'author',
      title: 'Author',
      type: 'string',
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
    },
    {
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'modifiedAt',
      title: 'Modified Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(5).max(40),
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
    },
    prepare(selection: any) {
      const {title, author} = selection
      return {
        title: title,
        subtitle: author ? `by ${author}` : '',
      }
    },
  },
}
