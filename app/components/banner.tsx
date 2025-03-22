"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: BannerSlide[] = [
    {
      id: 1,
      image: "/njz-banner.png?height=400&width=1200",
      title: "BTS와 함께하는",
      subtitle: "미래 세대를 위한 지속가능 발전 이니셔티브",
    },
    {
      id: 2,
      image: "/njz.png?height=400&width=1200",
      title: "새로운 캠페인",
      subtitle: "함께 만들어가는 더 나은 미래",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[300px] mb-8 overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={slide.image || "/njz.png"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* <div className="absolute bottom-8 left-8 z-20 text-white"> */}
          {/*   <h2 className="text-xl font-medium">{slide.title}</h2> */}
          {/*   <p className="text-sm mt-1">{slide.subtitle}</p> */}
          {/* </div> */}
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
