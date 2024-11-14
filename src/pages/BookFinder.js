import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { fetchBooks } from '../services/api';

const BookFinder = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('fiction');
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const cache = {};

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchBooksWithCache = async (title) => {
    const cacheKey = `${title}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    } else {
      const result = await fetchBooks(title);
      cache[cacheKey] = result;
      return result;
    }
  };

  const handleSearch = useCallback(
    debounce(async (title) => {
      setLoading(true);
      setError(null);
      setHasMore(true);
      setPage(1);
      setSearchTerm(title);

      setBooks([]); 

      try {
        const results = await fetchBooksWithCache(title);
        setBooks(results.slice(0, 10));
      } catch (err) {
        setError('Failed to load books');
      }
      setLoading(false);
    }, 300),
    []
  );

  const loadMoreBooks = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newBooks = await fetchBooksWithCache(searchTerm);
      const nextBooks = newBooks.slice(page * 10, (page + 1) * 10);
      if (nextBooks.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...nextBooks]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError('Failed to load more books');
    }
    setLoading(false);
  }, [loading, hasMore, page, searchTerm]);

  useEffect(() => {
    handleSearch('fiction');
  }, [handleSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreBooks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreBooks]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center dark:text-white">Book Finder</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white p-2 rounded-md dark:bg-gray-700"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-center text-red-500 dark:text-red-300">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default BookFinder;
