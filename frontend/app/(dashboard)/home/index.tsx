import React from 'react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <div className="text-indigo-600 font-medium mb-2 text-sm">LIBRARY MANAGEMENT</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simplify Your Library Operations
          </h1>
          <p className="text-base text-gray-600 mb-6">
            Welcome to our Library Management System, a platform designed to help you efficiently 
            manage books, memberships, and library operations. Whether you're a librarian or a library 
            member, our system ensures a seamless experience for everyone.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            Explore Features
          </button>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://img.freepik.com/free-vector/women-library-reading-searching-books_33099-1732.jpg?t=st=1732475937~exp=1732479537~hmac=105d5c217b8c435199e2d56daef6c1bbbe8fbe82bdffd05d306f9ba40efeee67&w=1060" 
            alt="Bookshelf with organized books" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://img.freepik.com/free-vector/young-woman-read-book-public-library-night_107791-27402.jpg?t=st=1732475546~exp=1732479146~hmac=0aae96a9528efaf3158fbff6666f2f1af3d33a3de4f2f024cd3a648b2f2d8eef&w=1060" 
            alt="People working in a library" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-indigo-600 font-medium mb-2 text-sm">ABOUT US</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Empowering Libraries Everywhere
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Our Library Management System streamlines cataloging, borrowing, and member services 
            for libraries of all sizes. With an intuitive interface and powerful tools, we aim to 
            enhance the library experience for both staff and patrons.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            Learn More About Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
