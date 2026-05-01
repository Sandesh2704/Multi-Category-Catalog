
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Star, Shield, Truck, RotateCcw, Check } from 'lucide-react';
import Link from 'next/link';

import ProductDetailsSkeleton from '@/section/ProductDetailsSkeleton';
import ProductImages from '@/section/ProductImages';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Item } from '@/types/types';
import { itemsWithId, groupedData } from '@/lib/utils';

function getPriceFromId(id?: string | number | null): number {
  if (id === undefined || id === null) return 0;
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const min = 50;
  const max = 150;
  const normalized = (hash % 100000) / 100000;
  return min + normalized * (max - min);
}

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="min-h-[700px] bg-gray-50 flex items-center justify-center">
    <div className="text-center max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-red-500 text-6xl mb-6">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Error Loading Product</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <Button onClick={onRetry} className="py-4">
        Try Again
      </Button>
    </div>
  </div>
);

export function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Item | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [price] = useState(() => (Math.random() * 100 + 50).toFixed(2));

  const fetchProductData = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      const foundProduct = itemsWithId.find(item => item.id === id);

      if (!foundProduct) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      setProduct(foundProduct);

      const sameCategoryProducts = groupedData[foundProduct.category] || [];
      const related = sameCategoryProducts
        .filter(item => item.id !== foundProduct.id)
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      Promise.resolve().then(() => {
        fetchProductData();
      });
    }
  }, [id, fetchProductData]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProductData} />;
  if (!product) return <ErrorMessage message="Product not found" onRetry={fetchProductData} />;

  return (
    <>

      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 capitalize">
                {product.category}
              </h2>
              <p className="text-lg text-white capitalize">Collection</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-white/80">Free Shipping</p>
                  <p className="font-semibold">On Orders 50+</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/80">Easy Returns</p>
                  <p className="font-semibold">30-Day Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/product?categories=${encodeURIComponent(product.category)}`} className="text-gray-600 hover:text-gray-900">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{product.itemname}</span>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 pb-4">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

            <div className="lg:col-span-5 space-y-4">
              <div className="sticky top-32">
                <ProductImages images={product.image} productName={product.itemname} />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              <div>
                <h1 data-testid="product-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {product.itemname}
                </h1>
              </div>

              <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-lg">4.5</span>
                </div>
                <span className="text-blue-600 hover:underline text-sm cursor-pointer">
                  12 reviews
                </span>
              </div>


              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Specifications</h3>
                <div className="space-y-3">
                  {product.itemprops?.map((prop, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{prop.label}</span>
                      <span className="text-gray-900 font-semibold">{prop.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inclusive of all taxes</span>
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <Check className="w-5 h-5 mr-2" />
                    FREE delivery on orders over $50
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-3 text-gray-900">Key Features</h2>
                <ul className="space-y-2">
                  {product.itemprops?.slice(0, 5).map((prop, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{prop.label}: {prop.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

    
 </div>
              <div className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg sticky top-32">
                  <div className="mb-6">
                    <div className="flex items-center text-green-600 font-semibold mb-2">
                      <Check className="w-5 h-5 mr-2" />
                      In Stock
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mt-4">
                      ${price}
                    </div>
                  </div>

                  <Button className="w-full py-3 text-lg mb-3">
                    Add to Cart
                  </Button>

                  <Button variant="outline" className="w-full py-3 text-lg">
                    Buy Now
                  </Button>

                  <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Shield className="w-5 h-5 text-gray-600 mr-3" />
                      <span>Secure transaction</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="w-5 h-5 text-gray-600 mr-3" />
                      <span>Ships from Warehouse</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <RotateCcw className="w-5 h-5 text-gray-600 mr-3" />
                      <span>30-day return policy</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      <span className="text-sm text-gray-600">Add gift wrap ($5.00)</span>
                    </label>
                  </div>
                </div>
              </div>
           

          </div>
        </div>


        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Related Products</h2>
                <p className="text-gray-600">More {product.category} you might like</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default ProductDetailsPage;