"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    image: "/slide1.png",
    title: "“Once a MCCian, Always a MCCian”",
    subtitle: "Cherishing the golden days, timeless friendships, and unforgettable memories made along these paths.",
  },
  {
    image: "/slide2.png",
    title: "“Where Dreams Were Coded”",
    subtitle: "From lab breakthroughs to shared laughter, celebrating the journeys that started right here.",
  },
];

export function AuthSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images into memory so there is zero flicker or blank screen
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="auth-image"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1e293b",
      }}
    >
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.image}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: isActive ? "scale(1.05)" : "scale(1.0)",
                transition: "transform 6s ease-out",
              }}
              onError={(e) => {
                // Graceful fallback to slide1 if anything ever fails
                (e.target as HTMLImageElement).src = "/slide1.png";
              }}
            />
            {/* Gradient Overlay for text contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.05) 100%)",
              }}
            />
            {/* Caption */}
            <div
              style={{
                position: "absolute",
                bottom: 36,
                left: 24,
                right: 24,
                color: "#ffffff",
                textAlign: "left",
                zIndex: 3,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 700,
                  color: "#ffffff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {slide.title}
              </h3>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.4,
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        );
      })}

      {/* Slide Indicator Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              background:
                idx === currentIndex
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
