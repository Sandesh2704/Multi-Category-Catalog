"use client"
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Item } from '@/types/types';

interface ProductCardProps {
  product: Item
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      data-testid="product-card"
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <Link
        href={`/product/${product.id}`}
        className="flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative h-[280px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.itemname}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 rotate-1' : 'scale-100'
              } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`} />

          {/* Quick View Button on Hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold transform transition-transform hover:scale-105">
              Quick View
            </span>
          </div>
        </div>

        {/* Content with Slide-up Effect on Hover */}
        <div className={`p-5 flex flex-col flex-1 bg-white transform transition-all duration-500 ${isHovered ? 'translate-y-[-8px]' : 'translate-y-0'
          }`}>
          {/* Category */}
          <p className="text-xs text-blue-600 mb-2 font-semibold uppercase tracking-wider">
            {product.category}
          </p>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900  line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.itemname}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;