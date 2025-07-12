import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
      <h1 className="text-7xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        The page you’re looking for might have been removed, renamed, or
        temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="px-6 py-3 text-sm font-medium transition-colors hover:bg-primary/90">
          ← Back to Home
        </Button>
      </Link>
    </div>
  );
}
