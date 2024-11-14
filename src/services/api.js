export const fetchBooks = async (title) => {
  const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
  if (!response.ok) throw new Error("Failed to fetch books.");
  const data = await response.json();
  return data.docs;
};
