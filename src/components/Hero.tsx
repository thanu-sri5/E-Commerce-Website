import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Percent, Award, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data';

interface HeroProps {
  onCtaClick: (category: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden bg-zinc-900" id="hero-slider">
      {/* Slides Container */}
      <AnimatePresence mode="wait">
        {HERO_SLIDES.map((slide, idx) => {
          if (idx !== currentSlide) return null;
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image with Ambient Zooming */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Overlay with Rich Gradients */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.colorClass} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/30" />

              {/* Slide Content */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white z-10">
                <div className="max-w-2xl space-y-3.5">
                  
                  {/* Subtle Subtitle Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] sm:text-xs font-black tracking-widest text-rose-400 uppercase"
                  >
                    <Percent className="w-3.5 h-3.5 shrink-0" />
                    <span>{slide.subtitle}</span>
                  </motion.div>

                  {/* Main Display Heading */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans text-white"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Tagline */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs sm:text-sm md:text-base text-zinc-200/90 font-medium font-mono"
                  >
                    {slide.tagline}
                  </motion.p>

                  {/* Extra Trust Badges for Production Depth */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="hidden sm:flex items-center gap-4 text-xs text-zinc-300 font-medium"
                  >
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Certified Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Curated Selection</span>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2 sm:pt-4"
                  >
                    <button
                      onClick={() => onCtaClick(slide.category)}
                      className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-rose-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/25 cursor-pointer"
                    >
                      <span>{slide.ctaText}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 text-white backdrop-blur-sm transition-all duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 text-white backdrop-blur-sm transition-all duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide ? 'w-6 bg-rose-500' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
