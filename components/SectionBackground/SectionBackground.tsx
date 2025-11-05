"use client";

import Image from "next/image";
import { movieService } from "@/lib/services/movieService";

interface SectionBackgroundProps {
  backdropPath: string | null;
  children: React.ReactNode;
  className?: string;
}

export const SectionBackground = ({ 
  backdropPath, 
  children, 
  className = "" 
}: SectionBackgroundProps) => {
  if (!backdropPath) {
    return <div className={className}>{children}</div>;
  }

  const imageUrl = movieService.getImageUrl(backdropPath);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          fill
          alt="Section Background"
          className="object-cover"
          priority
        />
      </div>
      
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

