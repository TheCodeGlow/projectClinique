import React from 'react';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img
        className="not-found-image"
        src={process.env.PUBLIC_URL + '/images/gif/404.gif'}
        alt="404 Not Found"
      />
      <a className="not-found-link" href="/">
        Go back to the homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
