import { useState, useRef, } from 'react';



const ProductImages = ({ images, productName }: { images: string; productName: string }) => {

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const mainImageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };




  return (
    <>

      {/* Desktop Gallery */}
      <div className="block">
        <div
          className="relative bg-white rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-lg group cursor-crosshair mb-4"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}

        >
          <div
            className={`w-full h-full transition-transform duration-200 ${showZoom ? 'scale-150' : 'scale-100'
              }`}
            style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
          >

            <div className="relative w-full h-full">


              <img
                data-testid="thumbnail"
                ref={mainImageRef}
                src={images}
                alt={productName}
                loading="lazy"
                className={`w-full h-full object-contain bg-white transition-opacity duration-300 `}
              />
            </div>
          </div>


        </div>


      </div>


    </>
  );
};

export default ProductImages

