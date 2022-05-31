//........................................................
//.bbbb..............................kkk..................
//.bbbb..............................kkk..................
//.bbbb..............................kkk..................
//.bbbbbbbbb....ooooooo....ooooooo...kkk..kkkk.ssssssss...
//.bbbbbbbbbb..ooooooooo..ooooooooo..kkk.kkkkk.ssssssss...
//.bbbbbbbbbbboooooooooooooooooooooo.kkkkkkkk.ssssssssss..
//.bbbbb.bbbbboooo...oooooooo...oooo.kkkkkkk..ssssssssss..
//.bbbb...bbbboooo...oooooooo...oooo.kkkkkkk...ssssssss...
//.bbbb...bbbboooo...oooooooo...oooo.kkkkkkk...ssssssss...
//.bbbbb..bbbboooo...oooooooo...oooo.kkkkkkkk.ssssssssss..
//.bbbbbbbbbbboooooooooooooooooooooo.kkk.kkkk.sssss.ssss..
//.bbbbbbbbbb..ooooooooo..ooooooooo..kkk.kkkkkssssssssss..
//.bbbbbbbbbb...ooooooo....ooooooo...kkk..kkkksssssssss...
//......bbb......ooooo......ooooo...............ssssss....
//........................................................

let library = [];

class Book {
  constructor(name, pages, rating, status) {
    this.name = name;
    this.pages = pages;
    this.rating = rating;
    if (status) {
      this.status = "read";
    } else {
      this.status = "not read";
    }
  }
  create() {
    let object = {
      name: this.name,
      pages: this.pages,
      rating: this.rating,
      status: this.status,
    };
    return object;
  }

  get result() {
    return this.create();
  }
}

function addBooks(book) {
  library.push(book);
  return library;
}

//get the doms
const addBook = document.querySelector("[data-add]");
const modalBook = document.querySelector("[data-book-modal]");
const overlay = document.querySelector("[data-overlay]");
const bookTitleInput = document.querySelector("[data-book-title]");
const bookPagesInput = document.querySelector("[data-book-pages]");
const bookRatingInput = document.querySelector("[data-book-rating]");
const bookRatingOutput = document.querySelector("[data-brating-output]");
const bookStatusInput = document.querySelector("[data-book-status]");
const bookSubmitBtn = document.querySelector("[data-book-submit]");
let bookCards = document.querySelector("[data-book-cards]");
let bookEntry = document.querySelector("[data-book-entry]");
let bookTitleEntry = document.querySelector("[data-btitle-entry]");
let bookPagesEntry = document.querySelector("[data-bpages-entry]");
let bookRatingEntry = document.querySelector("[data-brating-entry]");
let bookStatusEntry = document.querySelector("[data-bstatus-entry]");
let removeButton = document.querySelectorAll("#remove-btn");
let editButton = document.querySelectorAll("#edit-btn");
let editModal = document.querySelector("[data-book-edit]");
const editBookRating = document.getElementById("rating-edit");
const editBookRatingOutput = document.getElementById("edit-temp-rating");

//values
var bookIsRead = false;
var bookRatingValue = "";
var editBookRatingVal = "";

addBook.addEventListener("click", openModal);
overlay.addEventListener("click", () => {
  closeModal();
  resetEntry();
});
removeButton.forEach((button) => {
  button.addEventListener("click", removeEntry);
});
editButton.forEach((button) => {
  button.addEventListener("click", editBook);
});

function openModal() {
  modalBook.classList.add("active");
  overlay.classList.add("active");
}

function openEdit() {
  editModal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  editModal.classList.remove("active");
  modalBook.classList.remove("active");
  overlay.classList.remove("active");
  modalMovie.classList.remove("active");
  editMovieModal.classList.remove("active");
}

bookSubmitBtn.addEventListener("click", () => {
  closeModal();
  logBook();
  resetEntry();
});

//create entry card
function createEntry(titleVal, pagesVal, ratingVal, statusVal) {
  const newEntry = document.createElement("div");
  const entry = document.querySelector(".entry-text").cloneNode(true);
  const bTitle = document.createElement("h4");
  const bPages = document.createElement("h4");
  const bRating = document.createElement("h4");
  const bStatus = document.createElement("h4");
  const entryButtons = document.createElement("div");
  const editBtn = document.querySelector("#edit-btn").cloneNode(true);
  const removeBtn = document.querySelector("#remove-btn").cloneNode(true);

  newEntry.classList.add("entry-books");
  bTitle.classList.add("book-title");
  bPages.classList.add("book-pages");
  bRating.classList.add("book-rating");
  bStatus.classList.add("book-status");
  entryButtons.classList.add("entry-btns");
  removeBtn.addEventListener("click", removeEntry);
  editBtn.addEventListener("click", editBook);

  bTitle.textContent = titleVal;
  bPages.textContent = `${pagesVal} pages`;
  bRating.textContent = `${ratingVal} out of 10`;
  bStatus.textContent = statusVal;

  bookCards.appendChild(newEntry);
  newEntry.appendChild(entry);
  newEntry.appendChild(bTitle);
  newEntry.appendChild(bPages);
  newEntry.appendChild(bRating);
  newEntry.appendChild(bStatus);
  newEntry.appendChild(entryButtons);
  entryButtons.appendChild(editBtn);
  entryButtons.appendChild(removeBtn);
}

//logs book to library array
function logBook() {
  var bookTitle = bookTitleInput.value;
  var bookPages = bookPagesInput.value;
  var bookRating = bookRatingInput.value;
  if (bookIsRead == true) {
    bookStatus = "read";
  } else {
    bookStatus = "not read";
  }
  let newBook = new Book(bookTitle, bookPages, bookRating, bookStatus).result;

  localSave(newBook);

  if (bookTitle != "" && bookPages != "") {
    // addToEntry();
    createEntry(bookTitle, bookPages, bookRating, bookStatus);
    // console.log(library);
  } else {
    return;
  }
}

bookRatingInput.addEventListener("input", (e) => {
  bookRatingValue = e.target.value;
  bookRatingOutput.textContent = `${bookRatingValue}`;
});

editBookRating.addEventListener("input", (e) => {
  editBookRatingVal = e.target.value;
  editBookRatingOutput.textContent = `${editBookRatingVal}`;
});

bookStatusInput.addEventListener("input", () => {
  if (bookStatusInput.checked) {
    bookIsRead = true;
  } else {
    bookIsRead = false;
  }
});

//removes entry card & from array
function removeEntry(e) {
  const entry = e.target.parentNode.parentNode;
  const entryChildren = entry.children;
  const entryTitle = entryChildren.item(1);
  entry.remove();
  library.findIndex(function (book, index) {
    if (book.name == entryTitle.textContent) {
      deleteBook(index);
    }
  });

  movies.findIndex(function (movie, index) {
    if (movie.title == entryTitle.textContent) {
      deleteMovie(index);
    }
  });
}

//delete book from storage
function deleteBook(index) {
  let localItems = JSON.parse(localStorage.getItem("book"));
  library.splice(index, 1);
  localStorage.setItem("book", JSON.stringify(library));
}

function resetEntry() {
  bookTitleInput.value = "";
  bookPagesInput.value = "";
  bookRatingInput.value = 5;
  bookRatingOutput.value = 5;
  bookStatusInput.checked = false;

  movieTitleInput.value = "";
  movieYearInput.value = "";
  movieRatingInput.value = 5;
  movieRatingOutput.value = 5;
  movieStatusInput.checked = false;
}

//edit entry
function editBook(e) {
  openEdit();
  let entry = e.target.parentNode.parentNode.children;
  let title = entry.item(1);
  let pages = entry.item(2);
  let rating = entry.item(3);
  let status = entry.item(4);

  var currentTitle = document.getElementById("editbook-title");
  var currentPages = document.getElementById("edit-pages");
  var currentRatingSlider = document.getElementById("rating-edit");
  var currentRatingVal = document.getElementById("edit-temp-rating");
  var currentStatus = document.getElementById("edit-status");

  currentTitle.value = title.textContent;
  let pagesSlice = pages.textContent.search(" ");
  currentPages.value = pages.textContent.slice(0, pagesSlice);

  let ratingSlice = rating.textContent.search(" ");
  currentRatingSlider.value = rating.textContent.slice(0, ratingSlice);
  currentRatingVal.textContent = currentRatingSlider.value;

  if (status.textContent == "read") {
    currentStatus.checked = true;
  } else {
    currentStatus.checked = false;
  }

  library.findIndex(function (book, index) {
    if (
      book.name == currentTitle.value &&
      book.pages == currentPages.value &&
      book.rating == currentRatingSlider.value &&
      book.status == status.textContent
    ) {
      // return index;
      // console.log(library[index].name);
      const updateBtn = document.getElementById("update-modal");
      updateBtn.addEventListener("click", () => {
        library[index].name = currentTitle.value;
        library[index].pages = currentPages.value;
        library[index].rating = currentRatingSlider.value;
        if ((currentStatus.checked = true)) {
          library[index].status = "read";
        } else {
          library[index].status = "not read";
        }
        title.textContent = library[index].name;
        pages.textContent = `${library[index].pages} pages`;
        rating.textContent = `${library[index].rating} out of 10`;
        status.textContent = `${library[index].status}`;

        let localItems = JSON.parse(localStorage.getItem("book"));
        localStorage.setItem("book", JSON.stringify(library));
        console.log(library[index]);

        closeModal();
      });
    }
  });
}

// local storage books
function localSave(item) {
  let localItems = JSON.parse(localStorage.getItem("book"));
  if (localItems === null) {
    library = [];
  } else {
    library = localItems;
  }
  library.push(item);
  localStorage.setItem("book", JSON.stringify(library));
}

//................................................................
//......................................vii.......................
//......................................vii.......................
//......................................vii.......................
//......................................vii.......................
//.mmmmmmmmmmmmm....ooooooo..ovvv..vvvv.vii...eeeeee...esssssss...
//.mmmmmmmmmmmmmm..moooooooo.ovvv..vvvv.vii..ieeeeeee..esssssss...
//.mmmmmmmmmmmmmm.mmoooooooooovvv..vvvv.vii.iieeeeeeeeeessssssss..
//.mmmm.mmmm..mmm.mmoo...oooo.vvvvvvvv..vii.iiee..eeeeeessssssss..
//.mmm..mmmm..mmm.mmoo...oooo.vvvvvvvv..vii.iieeeeeeee.esssssss...
//.mmm..mmmm..mmm.mmoo...oooo.vvvvvvvv..vii.iieeeeeeee.esssssss...
//.mmm..mmmm..mmm.mmoo...oooo..vvvvvv...vii.iiee......eessssssss..
//.mmm..mmmm..mmm.mmooooooooo..vvvvvv...vii.iieeeeeeeeeesss.ssss..
//.mmm..mmmm..mmm..moooooooo...vvvvvv...vii.iieeeeeee.eessssssss..
//.mmm..mmmm..mmm...ooooooo.....vvvv....vii..ieeeeeee..esssssss...
//...................ooooo.....................eeee.....ssssss....
//................................................................

let movies = [];

class Movie {
  constructor(title, year, rating, status) {
    this.title = title;
    this.year = year;
    this.rating = rating;
    this.status = status;

    if (status) {
      this.status = "watched";
    } else {
      this.status = "not watched";
    }
  }

  create() {
    let moviesObj = {
      title: this.title,
      year: this.year,
      rating: this.rating,
      status: this.status,
    };
    return moviesObj;
  }

  get result() {
    return this.create();
  }
}

function addMovies(movie) {
  movies.push(movie);
  return movies;
}

//get the doms

const addMovie = document.querySelector("[data-add-movie]");
const modalMovie = document.querySelector("[data-movie-modal]");
const movieTitleInput = document.querySelector("[data-movie-title]");
const movieYearInput = document.querySelector("[data-movie-year]");
const movieRatingInput = document.querySelector("[data-movie-rating]");
const movieRatingOutput = document.querySelector("[data-mrating-output]");
const movieStatusInput = document.querySelector("[data-movie-status]");
const movieSubmitBtn = document.querySelector("[data-movie-submit");
const movieCards = document.querySelector("[data-movie-cards]");
const editMovieModal = document.querySelector("[data-movie-edit]");

var movieIsWatched = false;
var movieRatingVal = "";
var editMovieRatingVal = "";

addMovie.addEventListener("click", openMovieModal);

function openMovieModal() {
  modalMovie.classList.add("active");
  overlay.classList.add("active");
}

function openEditMovie() {
  editMovieModal.classList.add("active");
  overlay.classList.add("active");
}

movieStatusInput.addEventListener("input", () => {
  if (movieStatusInput.checked) {
    movieIsWatched = true;
  } else {
    movieIsWatched = false;
  }
});

movieRatingInput.addEventListener("input", (e) => {
  movieRatingValue = e.target.value;
  movieRatingOutput.textContent = `${movieRatingValue}`;
});

movieSubmitBtn.addEventListener("click", () => {
  closeModal();
  logMovie();
  resetEntry();
});

//log movie function
function logMovie() {
  var movieTitle = movieTitleInput.value;
  var movieYear = movieYearInput.value;
  var movieRating = movieRatingInput.value;
  if (movieIsWatched == true) {
    movieStatus = "watched";
  } else {
    movieStatus = "not watched";
  }

  let newMovie = new Movie(movieTitle, movieYear, movieRating, movieStatus)
    .result;

  localSaveMovie(newMovie);

  if (movieTitle != "" && movieYear != "") {
    createMovie(movieTitle, movieYear, movieRating, movieStatus);
  } else {
    return;
  }
}

//create movie entry
function createMovie(title, year, rating, status) {
  const newEntry = document.createElement("div");
  const entry = document.querySelector(".entry-text").cloneNode(true);
  const mTitle = document.createElement("h4");
  const mYear = document.createElement("h4");
  const mRating = document.createElement("h4");
  const mStatus = document.createElement("h4");
  const entryButtons = document.createElement("div");
  const editBtn = document.querySelector("#edit-btn").cloneNode(true);
  const removeBtn = document.querySelector("#remove-btn").cloneNode(true);

  newEntry.classList.add("entry-movies");
  mTitle.classList.add("movie-title");
  mYear.classList.add("movie-year");
  mRating.classList.add("movie-rating");
  mStatus.classList.add("movie-status");
  entryButtons.classList.add("entry-btns");
  removeBtn.addEventListener("click", removeEntry);
  editBtn.addEventListener("click", editMovie);

  mTitle.textContent = title;
  mYear.textContent = year;
  mRating.textContent = `${rating} out of 10`;
  mStatus.textContent = status;

  movieCards.appendChild(newEntry);
  newEntry.appendChild(entry);
  newEntry.appendChild(mTitle);
  newEntry.appendChild(mYear);
  newEntry.appendChild(mRating);
  newEntry.appendChild(mStatus);
  newEntry.appendChild(entryButtons);
  entryButtons.appendChild(editBtn);
  entryButtons.appendChild(removeBtn);
}

//local storage movies
function localSaveMovie(item) {
  let localMovies = JSON.parse(localStorage.getItem("movie"));
  if (localMovies === null) {
    movies = [];
  } else {
    movies = localMovies;
  }

  movies.push(item);
  localStorage.setItem("movie", JSON.stringify(movies));
}

//UI local storage
function addToEntry() {
  let localItems = JSON.parse(localStorage.getItem("book"));
  if (localItems === null) {
    library = [];
  } else {
    library = localItems;
  }

  library.forEach((element) => {
    title = element.name;
    pages = element.pages;
    rating = element.rating;
    readStatus = element.status;
    createEntry(title, pages, rating, readStatus);
  });

  let localMovies = JSON.parse(localStorage.getItem("movie"));
  if (localMovies === null) {
    movies = [];
  } else {
    movies = localMovies;
  }

  movies.forEach((element) => {
    title = element.title;
    year = element.year;
    rating = element.rating;
    movieStatus = element.status;
    createMovie(title, year, rating, movieStatus);
  });
}

addToEntry();

//delete entry
function deleteMovie(index) {
  let localMovies = JSON.parse(localStorage.getItem("movie"));
  movies.splice(index, 1);
  localStorage.setItem("movie", JSON.stringify(movies));
}

//edit movie entry
function editMovie(e) {
  openEditMovie();
  let entry = e.target.parentNode.parentNode.children;
  let title = entry.item(1);
  let year = entry.item(2);
  let rating = entry.item(3);
  let status = entry.item(4);

  var currentTitle = document.getElementById("editmovie-title");
  var currentYear = document.getElementById("editmovie-year");
  var currentRatingSlider = document.getElementById("editrating-movie");
  var currentRatingVal = document.getElementById("editmovietemp-rating");
  var currentStatus = document.getElementById("edit-m-status");

  currentTitle.value = title.textContent;
  currentYear.value = year.textContent;
  let ratingSlice = rating.textContent.search(" ");
  currentRatingSlider.value = rating.textContent.slice(0, ratingSlice);
  currentRatingVal.textContent = currentRatingSlider.value;

  if (status.textContent == "watched") {
    currentStatus.checked = true;
  } else {
    currentStatus.checked = false;
  }

  movies.findIndex(function (movie, index) {
    if (
      movie.title == currentTitle.value &&
      movie.year == currentYear.value &&
      movie.rating == currentRatingSlider.value &&
      movie.status == status.textContent
    ) {
      console.log(movies[index].title);
      const updateBtn = document.getElementById("update-movie");
      updateBtn.addEventListener("click", () => {
        movies[index].title = currentTitle.value;
        movies[index].year = currentYear.value;
        movies[index].rating = currentRatingSlider.value;
        if ((currentStatus.checked = true)) {
          movies[index].status = "watched";
        } else {
          movies[index].status = "not watched";
        }
        title.textContent = movies[index].title;
        year.textContent = movies[index].year;
        rating.textContent = `${movies[index].rating} out of 10`;
        status.textContent = `${movies[index].status}`;

        let localMovies = JSON.parse(localStorage.getItem("movie"));
        localStorage.setItem("movie", JSON.stringify(movies));
        console.log(movies[index]);

        closeModal();
      });
    }
  });
}
