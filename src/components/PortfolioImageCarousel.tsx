import React, { useState, useEffect, useRef } from 'react';
import LazyImage from './LazyImage';
import { resolveImageUrl } from '../utils/imageUtils';

const AUTO_ADVANCE_MS = 4500;

interface PortfolioImageCarouselProps {
  urls: string[];
  alt: string;
}

const PortfolioImageCarousel: React.FC<PortfolioImageCarouselProps> = ({ urls, alt }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (urls.length < 2 || reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [urls.length, reduceMotion, paused]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || urls.length < 2) return;
    const obs = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), {
      threshold: 0.12,
      rootMargin: '0px'
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [urls.length]);

  const transitionClass = reduceMotion ? 'duration-0' : 'duration-700 ease-in-out';

  if (urls.length < 2) {
    const u = urls[0];
    return (
      <LazyImage
        src={resolveImageUrl(u)}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-0"
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
    >
      {urls.map((u, i) => (
        <div
          key={u}
          className={`absolute inset-0 overflow-hidden transition-opacity ${transitionClass} ${
            i === index ? 'z-[1] opacity-100' : 'z-0 opacity-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <LazyImage
            src={resolveImageUrl(u)}
            alt={i === index ? alt : ''}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'lazy' : 'lazy'}
          />
        </div>
      ))}
      <div
        className="absolute bottom-2 left-0 right-0 z-[2] flex justify-center gap-1.5"
        role="tablist"
        aria-label="Slides do projeto"
      >
        {urls.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Imagem ${i + 1} de ${urls.length}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-5 bg-purple-400 shadow-sm'
                : 'w-1.5 bg-white/70 hover:bg-white'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioImageCarousel;
