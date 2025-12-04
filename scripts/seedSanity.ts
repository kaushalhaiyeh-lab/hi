import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Helper to read .env file
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf-8');
            envConfig.split('\n').forEach((line) => {
                const [key, value] = line.split('=');
                if (key && value && !process.env[key.trim()]) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (error) {
        console.warn('Could not load .env file', error);
    }
}

loadEnv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
    console.error('Missing PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
});

async function seed() {
    console.log('🌱 Starting Sanity seeding...');

    // 1. Site Settings
    const siteSettings = {
        _id: 'siteSettings',
        _type: 'siteSettings',
        siteName: 'Antigravity CMS',
        address: '123 Innovation Drive, Tech City, TC 90210',
        phone: '+1 (555) 123-4567',
        email: 'hello@antigravity.com',
        socialLinks: {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            linkedin: 'https://linkedin.com',
            instagram: 'https://instagram.com',
        },
        heroSection: {
            headline: 'Elevate Your Digital Presence',
            subheadline: 'We build high-performance websites and digital experiences that drive growth and engage your audience.',
            ctaText: 'Get Started',
            ctaLink: '/contact',
        },
        aboutMission: 'Our mission is to empower businesses with cutting-edge digital solutions that bridge the gap between technology and human connection. We believe in the power of simplicity, performance, and beautiful design to transform how brands interact with their customers.',
    };

    await client.createOrReplace(siteSettings);
    console.log('✅ Site Settings created');

    // 2. Services
    const services = [
        {
            _type: 'service',
            title: 'Web Development',
            slug: { current: 'web-development' },
            description: 'Custom, high-performance websites built with modern technologies like Astro, React, and Tailwind CSS.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We build fast, secure, and scalable websites tailored to your business needs.' }],
                }
            ],
            features: ['Custom Design', 'SEO Optimized', 'Mobile Responsive', 'Fast Loading'],
            featured: true,
            order: 1,
            icon: 'code',
        },
        {
            _type: 'service',
            title: 'Digital Marketing',
            slug: { current: 'digital-marketing' },
            description: 'Data-driven marketing strategies to increase your visibility and drive conversions.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Reach your target audience with precision through our comprehensive digital marketing services.' }],
                }
            ],
            features: ['Social Media Management', 'PPC Advertising', 'Content Marketing', 'Email Campaigns'],
            featured: true,
            order: 2,
            icon: 'chart-bar',
        },
        {
            _type: 'service',
            title: 'SEO Optimization',
            slug: { current: 'seo-optimization' },
            description: 'Improve your search engine rankings and drive organic traffic to your website.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Our SEO experts will help you climb the search results and get found by your customers.' }],
                }
            ],
            features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
            featured: true,
            order: 3,
            icon: 'search',
        },
        {
            _type: 'service',
            title: 'Brand Strategy',
            slug: { current: 'brand-strategy' },
            description: 'Define your brand identity and voice to stand out in a crowded market.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'We help you build a strong, memorable brand that resonates with your audience.' }],
                }
            ],
            features: ['Logo Design', 'Brand Guidelines', 'Messaging Strategy', 'Visual Identity'],
            featured: false,
            order: 4,
            icon: 'light-bulb',
        },
        {
            _type: 'service',
            title: 'UI/UX Design',
            slug: { current: 'ui-ux-design' },
            description: 'Create intuitive and engaging user experiences that delight your customers.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Our designers craft beautiful, user-centric interfaces that make your product a joy to use.' }],
                }
            ],
            features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
            featured: false,
            order: 5,
            icon: 'pencil',
        },
        {
            _type: 'service',
            title: 'Consulting',
            slug: { current: 'consulting' },
            description: 'Expert advice to help you navigate the digital landscape and achieve your business goals.',
            detailedDescription: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Leverage our expertise to make informed decisions and drive your business forward.' }],
                }
            ],
            features: ['Digital Strategy', 'Technology Assessment', 'Process Optimization', 'Growth Hacking'],
            featured: false,
            order: 6,
            icon: 'chat',
        },
    ];

    for (const service of services) {
        await client.create(service);
    }
    console.log('✅ Services created');

    // 3. Team Members
    const teamMembers = [
        {
            _type: 'teamMember',
            name: 'Sarah Jenkins',
            role: 'CEO & Founder',
            bio: 'Sarah has over 15 years of experience in the tech industry and is passionate about building innovative solutions.',
            order: 1,
        },
        {
            _type: 'teamMember',
            name: 'David Chen',
            role: 'CTO',
            bio: 'David is a full-stack wizard who loves solving complex technical challenges and leading engineering teams.',
            order: 2,
        },
        {
            _type: 'teamMember',
            name: 'Emily Rodriguez',
            role: 'Head of Design',
            bio: 'Emily brings a creative eye and a user-first approach to every project, ensuring beautiful and functional designs.',
            order: 3,
        },
        {
            _type: 'teamMember',
            name: 'Michael Chang',
            role: 'Marketing Director',
            bio: 'Michael is a data-driven marketer who knows how to connect brands with their ideal customers.',
            order: 4,
        },
    ];

    for (const member of teamMembers) {
        await client.create(member);
    }
    console.log('✅ Team Members created');

    // 4. Testimonials
    const testimonials = [
        {
            _type: 'testimonial',
            clientName: 'John Doe',
            company: 'TechStart Inc.',
            quote: 'Antigravity transformed our online presence. Our website traffic has doubled since the launch!',
            rating: 5,
            order: 1,
        },
        {
            _type: 'testimonial',
            clientName: 'Jane Smith',
            company: 'Creative Solutions',
            quote: 'The team was professional, responsive, and delivered exactly what we needed. Highly recommended!',
            rating: 5,
            order: 2,
        },
        {
            _type: 'testimonial',
            clientName: 'Robert Johnson',
            company: 'Global Corp',
            quote: 'Exceptional quality and attention to detail. They truly care about their clients success.',
            rating: 4,
            order: 3,
        },
        {
            _type: 'testimonial',
            clientName: 'Alice Williams',
            company: 'Innovate LLC',
            quote: 'Working with Antigravity was a game-changer for our business. They exceeded our expectations.',
            rating: 5,
            order: 4,
        },
        {
            _type: 'testimonial',
            clientName: 'Chris Brown',
            company: 'Future Tech',
            quote: 'A fantastic partner for any digital project. We look forward to working with them again.',
            rating: 5,
            order: 5,
        },
    ];

    for (const testimonial of testimonials) {
        await client.create(testimonial);
    }
    console.log('✅ Testimonials created');

    // 5. Blog Posts
    const blogPosts = [
        {
            _type: 'blogPost',
            title: 'The Future of Web Development',
            slug: { current: 'future-of-web-development' },
            author: 'David Chen',
            publishedAt: new Date().toISOString(),
            excerpt: 'Explore the latest trends and technologies shaping the future of the web.',
            categories: ['Technology', 'Development'],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Web development is constantly evolving...' }],
                }
            ]
        },
        {
            _type: 'blogPost',
            title: 'Mastering SEO in 2024',
            slug: { current: 'mastering-seo-2024' },
            author: 'Michael Chang',
            publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            excerpt: 'Learn the key strategies to improve your search engine rankings this year.',
            categories: ['Marketing', 'SEO'],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'SEO is more than just keywords...' }],
                }
            ]
        },
        {
            _type: 'blogPost',
            title: 'Design Principles for Better UX',
            slug: { current: 'design-principles-ux' },
            author: 'Emily Rodriguez',
            publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            excerpt: 'Discover the fundamental principles that create exceptional user experiences.',
            categories: ['Design', 'UX'],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Good design is invisible...' }],
                }
            ]
        },
        {
            _type: 'blogPost',
            title: 'Building a Strong Brand Identity',
            slug: { current: 'building-brand-identity' },
            author: 'Sarah Jenkins',
            publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            excerpt: 'How to create a brand that resonates with your audience and stands the test of time.',
            categories: ['Branding', 'Business'],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Your brand is your promise...' }],
                }
            ]
        },
        {
            _type: 'blogPost',
            title: 'The Power of Content Marketing',
            slug: { current: 'power-content-marketing' },
            author: 'Michael Chang',
            publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
            excerpt: 'Why content is king and how to use it to drive growth for your business.',
            categories: ['Marketing', 'Content'],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Content marketing is a long-term strategy...' }],
                }
            ]
        },
    ];

    for (const post of blogPosts) {
        await client.create(post);
    }
    console.log('✅ Blog Posts created');

    console.log('🎉 Seeding completed successfully!');
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
