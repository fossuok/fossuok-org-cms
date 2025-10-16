export default {
  name: 'author',
  title: 'Authors',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(12),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule: any) => Rule.min(3).max(12),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) =>
        Rule.required().email().error('Please enter a valid email address'),
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          validation: (Rule: any) =>
            Rule.uri({
              scheme: ['http', 'https'],
              allowRelative: false,
            }),
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          validation: (Rule: any) =>
            Rule.uri({
              scheme: ['http', 'https'],
              allowRelative: false,
            }),
        },
      ],
    },
    {
      name: 'username',
      title: 'Username',
      type: 'slug',
      description: 'A unique identifier for the profile.',
      placeholder: 'johndoe',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'email',
        slugify: (input: string) => {
          // take only the part before @
          const localPart = input.split('@')[0] || ''
          return localPart
            .toLowerCase()
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '') // remove invalid characters
            .slice(0, 96)
        },
      },
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'avatar',
      email: 'email',
    },
    prepare(selection: {firstName?: string; lastName?: string; media?: any; email?: string}) {
      const {firstName, lastName, media, email} = selection
      return {
        title: lastName ? `${firstName} ${lastName}` : firstName,
        media: media,
        subtitle: email,
      }
    },
  },
}
