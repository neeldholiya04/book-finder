import React from 'react';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/150';

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-40 object-cover mb-2 rounded transition-opacity duration-700 ease-in-out"
        loading="lazy"
      />
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-200">{book.title}</h3>
      <p className="text-gray-700 dark:text-gray-400">by {book.author_name?.join(', ')}</p>
      <p className="text-gray-500 text-sm dark:text-gray-500">Published in {book.first_publish_year}</p>
    </div>
  );
};

export default BookCard;
