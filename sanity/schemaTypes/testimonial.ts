import { defineType } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        {
            name: 'clientName',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'company',
            title: 'Company',
            type: 'string',
        },
        {
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Client Image (optional)',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
            initialValue: 5,
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
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
