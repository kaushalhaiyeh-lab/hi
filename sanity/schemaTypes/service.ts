import { defineType } from 'sanity';

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'detailedDescription',
            title: 'Detailed Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'image',
            title: 'Service Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'icon',
            title: 'Icon Name (optional)',
            type: 'string',
            description: 'Icon identifier for displaying in cards',
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of key features for this service',
        },
        {
            name: 'featured',
            title: 'Featured Service',
            type: 'boolean',
            description: 'Show this service on the home page',
            initialValue: false,
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this service appears (lower numbers first)',
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
