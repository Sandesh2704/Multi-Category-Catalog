
import Link from "next/link";
import { Container } from "./Container";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white ">

            <Container className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">
                            Assignment Store
                        </h2>
                        <p className="text-sm text-gray-600">
                            Simple ecommerce demo built with React, TypeScript, and Tailwind.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Quick Links
                        </h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-black">
                                Home
                            </Link>
                            
                        </div>
                    </div>

                    {/* Contact / Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Info
                        </h3>
                        <p className="text-sm text-gray-600">
                            Fast delivery • Secure payments • Easy returns
                        </p>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm text-gray-500">
                    © 2026 Assignment Store. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}