
# Book Finder

Book Finder is a React web application that allows users to search for books using the Open Library API. Users can search for books by title, view book details, and load more results as they scroll. The app also features a dark mode toggle for better user experience.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Usage](#api-usage)
- [Components](#components)
- [Dark Mode Implementation](#dark-mode-implementation)
- [Infinite Scrolling](#infinite-scrolling)


## Features
- **Book Search**: Search for books by title using the Open Library API.
- **Infinite Scrolling**: Automatically loads additional results as the user scrolls down.
- **Dark Mode**: Toggle between light and dark themes, with preference saved to `localStorage`.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Animations**: Smooth transitions and hover effects for a better user experience.

## Demo
You can view the live demo of the Book Finder app [here](https://your-live-demo-url.com).

## Tech Stack
- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lodash.debounce**: Debouncing search requests to optimize performance
- **Open Library API**: Public API used to fetch book data

## Installation

### Prerequisites
- Node.js and npm installed on your local machine

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/neeldholiya04/book-finder.git
   cd book-finder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   This will start the application on `http://localhost:3000`.

## Usage
1. **Search for Books**: Type a title in the search bar and press "Enter" or click "Search" to find books.
2. **Infinite Scrolling**: Scroll down to load more results automatically.
3. **Toggle Dark Mode**: Click the "Dark Mode" or "Light Mode" button to toggle themes. The app will remember your theme preference.

## Project Structure

```
book-finder/
├── public/
├── src/
│   ├── components/
│   │   ├── BookCard.js           # Displays individual book details
│   │   ├── Loader.js             # Loading spinner component
│   │   ├── SearchBar.js          # Search bar component
│   ├── pages/
│   │   ├── BookFinder.js         # Main page with search functionality and dark mode toggle
│   ├── services/
│   │   ├── api.js                # API call logic to fetch books
│   ├── App.js                    # App component with routing
│   ├── index.js                  # Main entry point
│   ├── index.css                 # Global styles
│   ├── tailwind.config.js        # Tailwind CSS configuration
├── README.md                     # Project documentation
```

## API Usage
This app uses the [Open Library Search API](https://openlibrary.org/developers/api) to retrieve book data based on the search query. Here’s how the API is used in the app:

- **Endpoint**: `https://openlibrary.org/search.json`
- **Query Parameter**: `title` – Used to search for books by title.

Example request:
```bash
https://openlibrary.org/search.json?title=your-search-query
```

## Components

### `SearchBar`
- A search input field and a button to trigger book searches.
- Pressing "Enter" or clicking "Search" initiates the search.

### `BookCard`
- Displays book details such as the cover, title, author, and publication year.
- Includes animations for hover effects.

### `Loader`
- A spinner that shows while data is loading.
  
### `BookFinder`
- Main component handling book fetching, infinite scroll, and dark mode.

## Dark Mode Implementation
The app uses Tailwind CSS’s `dark` variant for dark mode styling, applying the `dark` class to the `<html>` element based on user preference. The mode preference is stored in `localStorage` to persist across sessions.

### Dark Mode Toggle
- **Button**: A toggle button labeled "Dark Mode" or "Light Mode" switches the theme.
- **Persistence**: The mode is saved in `localStorage`, so the app opens in the user’s last selected theme.

### Tailwind Configuration
Ensure `darkMode` is set to `'class'` in `tailwind.config.js`:
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {},
  },
}
```

## Infinite Scrolling
The app uses infinite scrolling to load additional books as the user scrolls down. This is handled with:
- **Page State**: Tracks the current "page" to load.
- **Event Listener**: Checks if the user is near the bottom of the page, then loads the next page.
  
### Infinite Scroll Logic
When the user reaches the bottom of the page:
1. A scroll event listener triggers the `loadMoreBooks` function.
2. The `loadMoreBooks` function fetches the next set of books from the API, appending them to the existing list.
