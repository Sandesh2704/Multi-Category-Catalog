import { Suspense } from "react";
import Productontent from "@/page/Productontent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Productontent />
    </Suspense>
  );
}


