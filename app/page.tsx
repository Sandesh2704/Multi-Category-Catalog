import ProductCard from "@/components/ProductCard";
import { Container } from "@/components/Container";
import { groupedData } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Shop Our Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products at great prices
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedData).map(([category, items]) => (
            <section key={category}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold capitalize text-gray-900">
                  {category}
                </h2>
                <Link
                  href={`/product?categories=${encodeURIComponent(category)}`}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.slice(0, 8).map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}