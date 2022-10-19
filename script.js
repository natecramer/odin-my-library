// todo
// - validate page number on the form to only accept numbers

function Book(title, author, pages, read) {
    // the constructor
    this.title = title,
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.domElem = '';
}

Book.prototype.info = function() {
    return `${String(this.title)}, by ${String(this.author)}, ${String(this.pages)} pages, ` + (this.read ? "read" : "not read yet");
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;

    if (this.read) {
        this.domElem.classList.add("read");
        this.domElem.children.item(0).classList.add("read");
    } else {
        this.domElem.classList.remove("read");
        this.domElem.children.item(0).classList.remove("read");
    }
}

let myLibrary = [];

function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages, false));
}

// add some placeholder books
addBookToLibrary("The Hobbit 1: Bilbo's Big Adventure", "J.R.R. Tolkien", 322);
addBookToLibrary("The Dark Knight", "Michael Crichton", 642);
addBookToLibrary("Gatsby 2", "David Plumber", 722);
addBookToLibrary("Jurassic Park III: The Novel", "Steven Spielberg", 359);
addBookToLibrary("Batman: Begins: The Book", "Johnnathan Davidson", 512);
addBookToLibrary("Dead Man Walking", "Steven King", 1286);
addBookToLibrary("The Great Scumbino", "Jack Davidson", 897);

updateBooks();

function updateBooks() {
    let output = document.querySelector(".books");
    output.replaceChildren([]); // clear array
    
    // go through array and create cards
    // pretty ugly... bewarned!
    let i = 0;
    myLibrary.forEach(e => {
        let card = document.createElement('div');
        card.classList.add('book-card');
    
        let bookHeader = document.createElement('div');
        bookHeader.classList.add('book-header');
    
        let title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = e.title;
        bookHeader.appendChild(title);
        
        // remove
        let removeDiv = document.createElement('div');
        removeDiv.classList.add('book-remove-div');
        let removeButton = document.createElement('button');
        removeButton.classList.add('book-remove-button');
        removeButton.textContent = 'X';
        removeButton["data-idx"] = i;
        removeButton.addEventListener('click', (e) => {
            myLibrary.splice(removeButton["data-idx"], 1);
            updateBooks();
        });

        removeDiv.appendChild(removeButton);
        bookHeader.appendChild(removeDiv);
    
        card.appendChild(bookHeader);
    
        let author = document.createElement('div');
        author.classList.add('book-author');
        author.textContent = `Author: ${e.author}`;
        card.appendChild(author);
    
        let pages = document.createElement('div');
        pages.classList.add('book-pages');
        pages.textContent = `Pages: ${e.pages}`;
        
        card.appendChild(pages);

        // read button
        let readButtonDiv = document.createElement('div');
        readButtonDiv.classList.add('readbutton-container');

        let readButton = document.createElement('button');
        readButton.classList.add('book-read-button');
        readButton.textContent = 'Unread';
        readButton["data-idx"] = i;
        readButton.addEventListener('click', (e) => {
            console.log('read');
            myLibrary[readButton["data-idx"]].toggleRead();

            if (myLibrary[readButton["data-idx"]].read) {
                readButton.classList.add('read');
                readButton.textContent = 'Read';
            } else {
                readButton.classList.remove('read');
                readButton.textContent = 'Unread';
            }
        });

        readButtonDiv.appendChild(readButton);
        card.appendChild(readButtonDiv);

        card["data-idx"] = i;
        myLibrary[i].domElem = card;

        i++;
        
        output.appendChild(card);
    });
}

let formContainer = document.querySelector('.form-container');
let form = document.querySelector('.add-book-form');
let formBackground = document.querySelector('.form-background');

let formInputTitle = document.querySelector('.book-title-input');
let formInputAuthor = document.querySelector('.book-author-input');
let formInputPages = document.querySelector('.book-pages-input');
let formAddButton = document.querySelector('.form-add-button');

document.querySelector('.add-button').addEventListener('click', (e) => {
    formContainer.style.display = 'block';
    formBackground.style.display = 'block';
    formInputTitle.value = '';
    formInputAuthor.value = '';
    formInputPages.value = '';
});

function closeForm() { 
    formContainer.style.display = 'none';
    formBackground.style.display = 'none';
    formInputTitle.value = '';
    formInputAuthor.value = '';
    formInputPages.value = '';
}

document.querySelector('.form-close').addEventListener('click', (e) => {
    closeForm();
});

// click outside form to close
formBackground.addEventListener('click', (e) => {
    closeForm();
});

function submitForm() {
    console.log('adding book');
    addBookToLibrary(formInputTitle.value, formInputAuthor.value, formInputPages.value);
    console.log(myLibrary[myLibrary.length-1].info());
    closeForm();
    updateBooks();
}

formAddButton.addEventListener('click', (e) => {
    submitForm();
});

// disable Enter key from submitting the form
form.onkeypress = function(e) {
    let key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        e.preventDefault();
        submitForm();
    }
};