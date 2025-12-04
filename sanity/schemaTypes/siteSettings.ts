import { defineType } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'address',
            title: 'Address',
            type: 'text',
            rows: 3,
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                {
                    name: 'facebook',
                    title: 'Facebook',
                    type: 'url',
                },
                {
                    name: 'twitter',
                    title: 'Twitter',
                    type: 'url',
                },
                {
                    name: 'linkedin',
                    title: 'LinkedIn',
                    type: 'url',
                },
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                },
            ],
        },
        {
            name: 'heroSection',
            title: 'Home Hero Section',
            type: 'object',
            fields: [
                {
                    name: 'headline',
                    title: 'Headline',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'subheadline',
                    title: 'Subheadline',
                    type: 'text',
                    rows: 2,
                },
                {
                    name: 'backgroundImage',
                    title: 'Background Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                },
                {
                    name: 'ctaLink',
                    title: 'CTA Button Link',
                    type: 'string',
                },
            ],
        },
        {
            name: 'aboutMission',
            title: 'About Page - Company Mission',
            type: 'text',
            rows: 5,
        },
    ],
});
