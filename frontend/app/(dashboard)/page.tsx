'use client';

import Author from "./authors/page";







export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      
      {/* Gọi component Author */}
      <div className="mt-4">
        <Author />
      </div>
    </main>
  );
}
