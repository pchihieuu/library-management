import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Library Management System</title>
        <meta name="description" content="Welcome to our Library Management System." />
      </Head>

      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white py-6 text-center">
          <h1 className="text-4xl font-bold">Library Management System</h1>
        </header>

        <section className="py-10 px-6 md:px-16 lg:px-32">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Our System</h2>
          <p className="text-lg mb-6">
            Our Library Management System helps you manage books, members, and staff efficiently, 
            making your library operations seamless.
          </p>
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <ul className="list-disc list-inside text-lg">
            <li>Efficient book management with categorization and availability tracking.</li>
            <li>Member management system with borrowing history and fines calculation.</li>
            <li>Staff tools for handling book check-in/check-out and inventory updates.</li>
            <li>Comprehensive reporting and statistics for data-driven decisions.</li>
          </ul>
        </section>

        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 Library Management System. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default Home;
