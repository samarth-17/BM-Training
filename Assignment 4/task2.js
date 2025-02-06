const booksLibrary = {
    books: [
      { title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling", yearPublished: 1997 },
      { title: "The Hobbit", author: "J.R.R. Tolkien", yearPublished: 1937 },
      { title: "The Last Wish", author: "Andrzej Sapkowski", yearPublished: 1993 },
      { title: "A Game of Thrones", author: "George R.R. Martin", yearPublished: 1996 },
    ],
  
   
    addBooks(title, author, yearPublished) {
      this.books.push({ title, author, yearPublished });
    },
  

    getBooksByAuthor(authorName) {
      return this.books.filter(book => book.author === authorName);
    },

    removeBookByTitle(title) {
      this.books = this.books.filter(book => book.title !== title);
    },
  

    getAllBooksByTitle() {
      return this.books.map(book => book.title);
    }
  };
  

  console.log("All Books:", booksLibrary.books);

  /* OUTPUT:
  All Books: [
    { title: 'Harry Potter and the Sorcerer’s Stone', author: 'J.K. Rowling', yearPublished: 1997 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', yearPublished: 1937 },
    { title: 'The Last Wish', author: 'Andrzej Sapkowski', yearPublished: 1993 },
    { title: 'A Game of Thrones', author: 'George R.R. Martin', yearPublished: 1996 }
  ]
  */
  

  booksLibrary.addBooks("The Two Towers", "J.R.R. Tolkien", 1954);
  console.log(booksLibrary.books);
  /* OUTPUT:
 [
    { title: 'Harry Potter and the Sorcerer’s Stone', author: 'J.K. Rowling', yearPublished: 1997 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', yearPublished: 1937 },
    { title: 'The Last Wish', author: 'Andrzej Sapkowski', yearPublished: 1993 },
    { title: 'A Game of Thrones', author: 'George R.R. Martin', yearPublished: 1996 },
    { title: 'The Two Towers', author: 'J.R.R. Tolkien', yearPublished: 1954 }
  ]
  */
  

  console.log("Books by J.R.R. Tolkien:", booksLibrary.getBooksByAuthor("J.R.R. Tolkien"));
  /* OUTPUT:
  Books by J.R.R. Tolkien: [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', yearPublished: 1937 },
    { title: 'The Two Towers', author: 'J.R.R. Tolkien', yearPublished: 1954 }
  ]
  */
  
  // ✅ Remove "The Hobbit"
  booksLibrary.removeBookByTitle("The Hobbit");
  console.log(booksLibrary.books);
  /* OUTPUT:
 [
    { title: 'Harry Potter and the Sorcerer’s Stone', author: 'J.K. Rowling', yearPublished: 1997 },
    { title: 'The Last Wish', author: 'Andrzej Sapkowski', yearPublished: 1993 },
    { title: 'A Game of Thrones', author: 'George R.R. Martin', yearPublished: 1996 },
    { title: 'The Two Towers', author: 'J.R.R. Tolkien', yearPublished: 1954 }
  ]
  */
  
  // ✅ Get all book titles
  console.log("All Book Titles:", booksLibrary.getAllBooksByTitle());
  /* OUTPUT:
  All Book Titles: [
    'Harry Potter and the Sorcerer’s Stone',
    'The Last Wish',
    'A Game of Thrones',
    'The Two Towers'
  ]
  */
  