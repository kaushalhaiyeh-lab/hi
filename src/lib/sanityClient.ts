import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// Sanity client configuration
export const sanityClient = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
    useCdn: true, // Use CDN for faster response times
    apiVersion: '2024-01-01',
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Helper functions for fetching content
export async function getSiteSettings() {
    return await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getAllServices() {
    return await sanityClient.fetch(
        `*[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      detailedDescription,
      image,
      icon,
      features,
      featured,
      order
    }`
    );
}

export async function getFeaturedServices(limit = 3) {
    return await sanityClient.fetch(
        `*[_type == "service" && featured == true] | order(order asc) [0...${limit}] {
      _id,
      title,
      slug,
      description,
      image,
      icon
    }`
    );
}

export async function getServiceBySlug(slug: string) {
    return await sanityClient.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      detailedDescription,
      image,
      icon,
      features
    }`,
        { slug }
    );
}

export async function getAllTeamMembers() {
    return await sanityClient.fetch(
        `*[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      bio,
      image,
      order
    }`
    );
}

export async function getAllTestimonials() {
    return await sanityClient.fetch(
        `*[_type == "testimonial"] | order(order asc) {
      _id,
      clientName,
      company,
      quote,
      image,
      rating,
      order
    }`
    );
}

export async function getAllBlogPosts() {
    return await sanityClient.fetch(
        `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      publishedAt,
      mainImage,
      excerpt,
      categories
    }`
    );
}

export async function getBlogPostBySlug(slug: string) {
    return await sanityClient.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      mainImage,
      excerpt,
      body,
      categories
    }`,
        { slug }
    );
}
