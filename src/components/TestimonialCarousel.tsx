'use client';

import { useState, useEffect } from 'react';
import { urlFor } from '@/lib/sanityClient';

interface Testimonial {
    _id: string;
    clientName: string;
    company?: string;
    quote: string;
    image?: any;
    rating: number;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                    {/* Stars */}
                    <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-6 h-6 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-neutral-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-neutral-700 mb-6 italic">
                        "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex flex-col items-center">
                        {currentTestimonial.image && (
                            <img
                                src={urlFor(currentTestimonial.image).width(80).height(80).url()}
                                alt={currentTestimonial.clientName}
                                className="w-16 h-16 rounded-full mb-3 object-cover"
                            />
                        )}
                        <p className="font-bold text-neutral-900">{currentTestimonial.clientName}</p>
                        {currentTestimonial.company && (
                            <p className="text-primary-600">{currentTestimonial.company}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <svg
                            className="w-6 h-6 text-neutral-700"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
                        aria-label="Next testimonial"
                    >
                        <svg
                            className="w-6 h-6 text-neutral-700"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {testimonials.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-primary-600 w-8'
                                : 'bg-neutral-300 hover:bg-neutral-400'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
