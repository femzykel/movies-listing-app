const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backDropEffect = document.getElementById('backdrop');
const addModalCancelBtn = document.getElementsByClassName('btn--passive')[0];
const userInputs = addMovieModal.querySelectorAll('input');
const addModalAddBtn = addMovieModal.querySelector('.btn--success');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const callBackDrop = () => {
  backDropEffect.classList.toggle('visible');
};

const updateUi = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  callBackDrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovie = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUi();
};

const deleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  callBackDrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
  
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
 
  // confirmDeletionButton.removeEventListener('click', deleteMovie.bind(null, movieId));

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);


  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__iage">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const clearMovieInputsField = () => {
  for (const userInputsField of userInputs) {
    userInputsField.value = '';
  }
};

const addModalAddBtnToggle = () => {
  const movieTitle = userInputs[0].value.trim();
  const movieImageUrl = userInputs[1].value.trim();
  const movieRating = userInputs[2].value.trim();

  if (
    movieTitle === '' ||
    movieImageUrl === '' ||
    movieRating === '' ||
    +movieRating < 1 ||
    +movieRating > 5
  ) {
    alert('Please fill the necessary field correclty before you can proceed!');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: movieTitle,
    imageUrl: movieImageUrl,
    rating: movieRating
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  callBackDrop();
  clearMovieInputsField();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageUrl,
    newMovie.rating
  );
  updateUi();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  callBackDrop();
};

const backDropHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInputsField();
};

const addModalCancelBtnToggle = () => {
  closeMovieModal();
  callBackDrop();
  clearMovieInputsField();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backDropEffect.addEventListener('click', backDropHandler);
addModalCancelBtn.addEventListener('click', addModalCancelBtnToggle);
addModalAddBtn.addEventListener('click', addModalAddBtnToggle);
