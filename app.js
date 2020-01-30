// 1st: Book Constructor
function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// 2nd: UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // 8th: Create tr element
    const row = document.createElement('tr');
    // 9th: Insert cols (to add cols to the table)
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href= "#" class="delete">X<a></td>
    `;

    list.appendChild(row);
}

// 13th: Show Alert
UI.prototype.showAlert = function(message, className){
    //14th: Creatd div
    const div = document.createElement('div');
    //15th: Add Classes
    div.className = `alert ${className}`;
    // 17th: Add Text
    div.appendChild(document.createTextNode(message));
    //18th: Get parent
    const container = document.querySelector('.container');
    //19th: Get form
    const form = document.querySelector('#book-form');
    // 20th: Insert alert
    container.insertBefore(div, form);

    //21st: Timeout after 2 secs
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);


}

//23rd: Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// 11th; Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title'). value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// 3rd: Event Listeners to add a book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    //4th: Get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    // 5th: Instantiate book (create book object(bundle it up))
    const book = new Book(title, author, isbn);

    // 6th: Instatiate UI
    const ui = new UI();

    //12th: Validate
    if(title === ''|| author === '' || isbn === '' ){
    // Error alert
    ui.showAlert('Please fill all fields', 'error');
    } else {

    // 7th: Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // 10th: Clear Fields
    ui.clearFields();
    }
 
    e.preventDefault();
});

// 22nd Event Listener to delete a book
document.getElementById('book-list').addEventListener('click', function(e){

    //24th: Instatiate UI
    const ui = new UI();
    
    //25th; Delete book
    ui.deleteBook(e.target);

    // 26th Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});