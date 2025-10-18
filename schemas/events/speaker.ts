export default {
  name: 'speaker',
  title: 'Event | Speakers',
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
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: any) => Rule.min(3).max(60),
    },
    {
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (Rule: any) => Rule.min(3).max(60),
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
      ],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'avatar',
      role: 'role',
      organization: 'organization',
    },
    prepare(selection: {
      firstName?: string
      lastName?: string
      media?: any
      role?: string
      organization?: string
    }) {
      const {firstName, lastName, media, role, organization} = selection
      return {
        title: lastName ? `${firstName} ${lastName}` : firstName,
        media: media,
        subtitle: role && organization ? `${role} @ ${organization}` : role ? role : organization,
      }
    },
  },
}
