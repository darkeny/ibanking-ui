// components/HeroCarousel.tsx
import React, { useState, useEffect } from 'react';
import { carouselContent } from '../../translations/carouselTexts';

interface HeroCarouselProps {
  language: 'PT' | 'EN';
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const slides = carouselContent[language];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  // Background images with realistic people
  const backgroundImages = [
    // Slide 1 - Business meeting
    "./business.jpg",
    
    // Slide 2 - Family buying home
    "./home.jpg",
    
    // Slide 3 - Young investors
    "./africanicidade2.jpg",
    
    // Slide 4 - Business professional
    "./africanicidade.jpg"
  ];
  
  return (
    <div 
      className="relative h-[600px] w-full overflow-hidden"
      onMouseEnter={() => {
        setIsAutoPlaying(false);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsAutoPlaying(true);
        setIsHovering(false);
      }}
    >
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="shrink-0 w-full h-full relative">
            
            {/* Background Image with Strong Blur and Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-100"
              style={{ backgroundImage: `url(${backgroundImages[index]})` }}
            >
              <div className="absolute inset-0 backdrop-blur-\ bg-black/10"></div>
              <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/60"></div>
            </div>

            {/* Content Container - Centered vertically, aligned left with spacing */}
            <div className="relative z-10 flex items-center h-full">
              <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 lg:px-16">
                <div className="max-w-2xl ml-0 lg:ml-16">
                  
                  {/* Badge */}
                  <div className="inline-block mb-6">
                    <span className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title - More Emphasis */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {slide.title}
                  </h1>

                  {/* Description - More Prominent */}
                  <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-xl font-light">
                    {slide.description}
                  </p>

                  {/* CTA Buttons - Smaller and More Refined */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                      {slide.ctaText}
                    </button>
                    
                    <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                      {language === 'PT' ? 'Saber Mais' : 'Learn More'}
                    </button>
                  </div>

                  {/* Additional Features - More Subtle */}
                  <div className="mt-8 flex flex-wrap gap-6">
                    <div className="flex items-center space-x-2 text-white/80">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-base">
                        {language === 'PT' ? 'Aprovação Rápida' : 'Fast Approval'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/80">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-base">
                        {language === 'PT' ? 'Taxas Competitivas' : 'Competitive Rates'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/80">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-base">
                        {language === 'PT' ? 'Suporte Personalizado' : 'Personalized Support'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Appear on hover */}
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg border border-gray-200 z-20 hover:scale-110 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg border border-gray-200 z-20 hover:scale-110 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modern Progress Indicators - Smaller and Discreet */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300 ${
        isHovering ? 'opacity-100' : 'opacity-40'
      }`}>
        <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex flex-col items-center group"
            >
              <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-500' 
                  : 'bg-white/30 group-hover:bg-white/50'
              }`} />
              <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                index === currentSlide 
                  ? 'text-white' 
                  : 'text-white/50 group-hover:text-white/70'
              }`}>
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play Indicator - More Subtle */}
      <div className={`absolute top-4 right-4 z-20 transition-all duration-300 ${
        isHovering ? 'opacity-100' : 'opacity-30'
      }`}>
        <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-white/40'}`} />
          <span className="text-sm text-white/80">
            {isAutoPlaying ? (language === 'PT' ? 'Auto' : 'Auto') : (language === 'PT' ? 'Pausado' : 'Paused')}
          </span>
        </div>
      </div>

      {/* Stronger Gradient Overlay for better text readability */}
      <div className="absolute right-0 top-0 w-2/5 h-full bg-linear-to-l from-black/50 to-transparent z-10"></div>
    </div>
  );
};