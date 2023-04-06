const addBookBtn = document.querySelector("#addBook");
const bookList = document.querySelector("[data-book-list]");
const addModal = document.querySelector("[data-modal]");
const closeBtn = document.querySelector("[data-close-btn]");
const submitBtn = document.querySelector("[data-submit-btn]");
const overlay = document.querySelector("[data-overlay]");
const addBookForm = document.querySelector("#newBookForm");

const BOOK_COLOR_LIST = [
    {"cover": "#f5b0ae", "edge": "#e49d9b"},
    {"cover": "#3ca5df", "edge": "#308ec8"},
    {"cover": "#edcf96", "edge": "#d6b87e"},
    {"cover": "#f9ed5b", "edge": "#e2d644"},
    {"cover": "#64c4a5", "edge": "#4cab8b"},
    {"cover": "#b2aeb1", "edge": "#989497"},
    {"cover": "#f6af7f", "edge": "#df9564"},
]

const Book = (title, author, pages, isCompleted) => {
    const bookColor = BOOK_COLOR_LIST[getRandomIndex()];

    return { title, author, pages, isCompleted, bookColor };
};

const Library = (() => {
    let library = [];

    const addBookToLibrary = (book) => { library.push(book); }
    const removeBookFromLibrary = (book) => {library.filter((elem) => elem !== book); }

    return { 
        library,
        addBookToLibrary,
        removeBookFromLibrary
    };
})();

const getRandomIndex = () => {
    return Math.floor(Math.random() * BOOK_COLOR_LIST.length);
} 

const openModal = () => {
    addModal.classList.add("active");
    overlay.classList.add("active");
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
}

const closeModal = () => {
    addModal.classList.remove("active");
    overlay.classList.remove("active");
}

const handleSubmit = (e) => {
    e.preventDefault();
    
    const titleinput = document.querySelector("#bookTitle");
    const authorInput = document.querySelector("#bookAuthor");
    const pagesInput = document.querySelector("#bookPages");

    if (
        titleinput.value === "" || 
        authorInput.value === "" || 
        pagesInput.value === "" ||
        parseInt(pagesInput.value, 10) < 0) {
        
            alert("Please write valid inputs");
    } else {
        const newBook = Book(
            titleinput.value, 
            authorInput.value, 
            parseInt(pagesInput.value, 10),
            true);
        Library.addBookToLibrary(newBook);
        addBookCard(newBook);

        closeModal();
        titleinput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
    }
}

const addBookCard = (newBook) => {
    const newCard = createBookElement(newBook);
    bookList.appendChild(newCard);
}

const renderBooks = () => {
    const books = bookList.querySelectorAll(".book-item");
    books.forEach(book => bookList.removeChild(book));

    for (let i = 0; i < Library.library.length; i++) {
        const newCard = createBookElement(Library.library[i]);
        bookList.appendChild(newCard);
    }
}

const createBookElement = (book) => {
    const bookElem = document.createElement("li");
    bookElem.classList.add("book-item");
    const cardElem = document.createElement("div");
    cardElem.setAttribute("id", Library.library.indexOf(book))
    cardElem.classList.add("card");
    cardElem.style.backgroundColor = `${book.bookColor["cover"]}`;
    cardElem.style.borderLeft = `8px solid ${book.bookColor["edge"]}`;

    cardElem.innerHTML = `
        <div class="book-info">
            <h2 class="book-title">"${book.title}"</h2>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages} pages</p>
        </div>
        <div class="btn-wrapper">
            <button id="removeBook" class="btn remove-btn"
            aria-lebel="remove book from library">
                Remove
            </button>
        </div>
    `

    bookElem.appendChild(cardElem);
    const removeBtn = cardElem.querySelector("#removeBook");
    removeBtn.addEventListener("click", () => {
        Library.library.splice(Library.library.indexOf(book), 1)
        renderBooks();
        console.log("remove")
    })

    return bookElem;
}

addBookBtn.addEventListener("click", openModal);

addBookForm.addEventListener("submit", handleSubmit);

window.addEventListener("load", () => {
    const newBook = Book(
        "Hobbit", 
        "J.R.R Tolkien", 
        301,
        true);
    Library.addBookToLibrary(newBook);
    addBookCard(newBook);
})