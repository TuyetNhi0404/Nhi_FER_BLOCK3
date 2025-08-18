import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import HeroCarousel from './components/HeroCarousel';
import MovieList from './components/MovieList';
import FavouriteMovies from './components/FavouriteMovies';
import MovieRequestForm from './components/MovieRequestForm';
import CustomToast from './components/CustomToast';


import { movies } from './data/movies';

import './styles/App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('movies');
  const [favourites, setFavourites] = useState([]);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('movieFavourites') || '[]');
    setFavourites(savedFavourites);
  }, []);

  useEffect(() => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  }, [favourites]);


  const handleAddToFavourite = (movieId) => {
    if (favourites.includes(movieId)) {
      setFavourites(favourites.filter(id => id !== movieId));
      showToast('Removed from favourites!', 'warning');
    } else {
      setFavourites([...favourites, movieId]);
      showToast('Added to favourites!', 'success');
    }
  };

  const showToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastShow(true);
  };

  const handleFormSubmit = () => {
    showToast('Request submitted. Thank you!', 'success');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'movies':
        return (
          <>
            <HeroCarousel />
            <MovieList 
              movies={movies}
              favourites={favourites}
              onAddToFavourite={handleAddToFavourite}
            />
          </>
        );
      case 'favourites':
        return (
          <FavouriteMovies 
            movies={movies}
            favourites={favourites}
            onAddToFavourite={handleAddToFavourite}
          />
        );
      case 'form':
        return <MovieRequestForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavigationBar 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      
      <div className="main-content">
        {renderCurrentView()}
      </div>

      <CustomToast 
        show={toastShow}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastShow(false)}
      />
    </>
  );
};

export default App;