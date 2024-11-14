import React, { Profiler, Suspense, lazy } from 'react';

const BookFinder = lazy(() => import('./pages/BookFinder'));

function App() {
  return (
    <Profiler id="App">
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <BookFinder />
        </Suspense>
      </div>
    </Profiler>
  );
}

export default App;
