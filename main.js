let library = [];

class Book {
  constructor(name, pages, rating, status) {
    this.name = name;
    this.pages = pages;
    this.rating = rating;
    if (status) {
      this.status = "read";
    } else {
      status = "not read";
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

//values
var bookIsRead = false;
var bookRatingValue = "";

addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

function openModal() {
  modalBook.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modalBook.classList.remove("active");
  overlay.classList.remove("active");
}

bookSubmitBtn.addEventListener("click", () => {
  closeModal();
  logBook();
});

function createEntry(titleVal, pagesVal, ratingVal, statusVal) {
  const newEntry = document.createElement("div");
  const entry = document.querySelector(".entry-text").cloneNode(true);
  const bTitle = document.createElement("h4");
  const bPages = document.createElement("h4");
  const bRating = document.createElement("h4");
  const bStatus = document.createElement("h4");
  const entryButtons = document.querySelector('.entry-btns').cloneNode(true)

  newEntry.classList.add("entry-books");
  bTitle.classList.add("book-title");
  bPages.classList.add("book-pages");
  bRating.classList.add("book-rating");
  bStatus.classList.add("book-status");
  entryButtons.classList.add("entry-btns");

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
}

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
  createEntry(bookTitle, bookPages, bookRating, bookStatus);
}

bookRatingInput.addEventListener("input", (e) => {
  bookRatingValue = e.target.value;
  bookRatingOutput.textContent = `${bookRatingValue}`;
});

bookStatusInput.addEventListener("input", () => {
  if (bookStatusInput.checked) {
    bookIsRead = true;
  } else {
    bookIsRead = false;
  }
});
