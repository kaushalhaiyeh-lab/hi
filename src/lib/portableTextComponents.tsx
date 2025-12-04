import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@sanity/types';

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-3 text-neutral-900">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mb-2 text-neutral-900">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-xl font-semibold mb-2 text-neutral-800">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4 text-neutral-600">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="ml-4">{children}</li>,
        number: ({ children }) => <li className="ml-4">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                className="text-primary-600 hover:text-primary-700 underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};

interface PortableTextRendererProps {
    value: PortableTextBlock[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
    return <PortableText value={value} components={components} />;
}
