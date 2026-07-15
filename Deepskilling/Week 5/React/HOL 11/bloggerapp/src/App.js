import React from 'react';
import BookDetails from './BookDetails';
import BlogDetails from './BlogDetails';
import CourseDetails from './CourseDetails';
import './App.css';

function App() {
  const showBooks = true;
  const showBlogs = true;
  const showCourses = true;

  return (
    <div className="container">
      {showCourses && (
        <div className="column">
          <CourseDetails />
        </div>
      )}

      {showBooks ? (
        <div className="column">
          <BookDetails />
        </div>
      ) : null}

      {showBlogs && (
        <div className="column">
          <BlogDetails />
        </div>
      )}
    </div>
  );
}

export default App;
