import { Container } from "../components/Container";


const ProductDetailsSkeleton = () => {
  return (
    <>
      {/* Hero Banner Skeleton */}
      <div className="relative bg-gradient-to-r from-primary to-secondary py-8 animate-pulse">
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-48 bg-white/20 rounded mb-2"></div>
              <div className="h-5 w-32 bg-white/20 rounded"></div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="h-3 w-24 bg-white/20 rounded mb-1"></div>
                  <div className="h-4 w-20 bg-white/20 rounded"></div>
                </div>
                <div className="text-right">
                  <div className="h-3 w-24 bg-white/20 rounded mb-1"></div>
                  <div className="h-4 w-20 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Breadcrumbs Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <Container className="px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <div className="h-4 w-2 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </Container>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 pb-4">
        <Container className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left Column - Image Gallery Skeleton */}
            <div className="lg:col-span-5 space-y-4">
              <div className="sticky top-32">
                <div className="hidden md:block">
                  <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square border border-gray-200 shadow-lg mb-4 animate-pulse"></div>
                  <div className="grid grid-cols-5 gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div className="relative md:hidden">
                  <div className="bg-gray-200 rounded-2xl h-[400px] w-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Middle Column - Product Details Skeleton */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div>
                <div className="h-10 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>

              <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Price Section Skeleton */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-baseline space-x-3 mb-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Key Features Skeleton */}
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <ul className="space-y-2">
                  {[...Array(5)].map((_, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-5 h-5 bg-gray-200 rounded mr-3 mt-0.5 animate-pulse"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Specifications Skeleton */}
              <div className="border-t pt-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <dl className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-3 w-16 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right Column - Buy Box Skeleton */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg sticky top-32">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 py-3 px-6 rounded-lg mb-3 animate-pulse h-12"></div>
                <div className="w-full bg-gray-200 py-3 px-6 rounded-lg animate-pulse h-12"></div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-5 h-5 bg-gray-200 rounded mr-3 animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded mr-3 animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex gap-0">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="px-8 py-4">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-200 h-64 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton