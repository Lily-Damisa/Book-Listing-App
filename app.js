 //Book Class: Represents a Book
  class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
 }

 //UI Class
 class UI{
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>   
        <td><a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    };

    //Update function
    // document.querySelector("#book-list").addEventListener("click", (e) => {
    //     target = e.target;
    //     if(target.classList.contains("edit")){
    //         selectedRow.target.parentElement.parentElement;
    //         document.querySelector("#title").value = selectedRow.children[0].textContent;
    //         document.querySelector("#author").value = selectedRow.children[1].textContent;
    //         document.querySelector("#isbn").value = selectedRow.children[2].textContent;
    //         showAlert("Book edited successfully", "info")
    //     }

    //     clearFields();
    // });

    //delete icon
    static deleteBook(el){
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    //update icon
    // static updateBook(el){
    //     if(el.classList.contains('update')) {
    //         el.parentElement.parentElement;
    //         document.querySelector("#title").value = selectedRow.children[0].textContent;
    //         document.querySelector("#author").value = selectedRow.children[1].textContent;
    //         document.querySelector("#isbn").value = selectedRow.children[2].textContent;
    //     }
    // }

    //bootstrap alert message
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Make the alert vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
 }

 //My Storage
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) =>{
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


 //Display books
 document.addEventListener('DOMContentLoaded', UI.displayBooks);

 //Add books
 document.querySelector('#book-form').addEventListener('submit', (e) => {

    //Prevent default action when you submit
    e.preventDefault();

    //Getting form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //Validation
    if (title === ''|| author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields!!!', 'danger');
    }
    else {
        const book = new Book(title, author, isbn);

        //Add Book to UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //Success message after adding a book
        UI.showAlert('Book added successfully!', 'success');
    
        //clear fields
        UI.clearFields();
    
    }


 });

 //Remove a book
 document.querySelector('#book-list').addEventListener('click', (e) => {
    //removing a book from the UI only
    UI.deleteBook(e.target);

    //removing a book from the store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Book removal alert message
    UI.showAlert('Book removed successfully', 'success')
 })