import { defineType } from 'sanity';

export default defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Role/Position',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 4,
        },
        {
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this team member appears',
        },
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
});
