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
  button.addEventListener("click", editEntry);
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
  editBtn.addEventListener("click", editEntry);

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
    console.log(library);
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
  const index = library.findIndex(function (book, index) {
    if (book.name == entryTitle.textContent) {
      deleteItem(index);
    }
  });

  console.log(library);
}

function resetEntry() {
  document.getElementById("book-title").value = "";
  document.getElementById("book-pages").value = "";
  document.getElementById("rating-book").value = 5;
  document.getElementById("temp-rating").value = 5;
  document.getElementById("b-status").checked = false;
}

//edit entry
function editEntry(e) {
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
      // console.log(library[index].name)
      const updateBtn = document.getElementById("edit");
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

//update entry

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

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem("book"));
  library.splice(index, 1);
  localStorage.setItem("book", JSON.stringify(library));
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
}

addToEntry();

// window.localStorage.clear();

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
