import React from 'react';
import { Link } from 'react-router-dom';

const CategoryRow = ({ categories, categories_url_slug, API_URL }) => {
  return (
    <section className="w-[90%] mx-auto mt-4">
      <h3 className="text-4xl font-semibold mb-6 text-[#0c6c6e]">Categories</h3>
      <div className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${categories_url_slug[category]}`}
            className="group flex-shrink-0 w-36 sm:w-40 md:w-44 flex flex-col items-center p-4 text-center hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4">
              <img
                src={`${API_URL}/${categories_url_slug[category]}.webp`}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
              {category}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;
