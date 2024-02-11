/**
 * we want to represent a library and it's books.
 * The library should:
 * - have a list of books that are available.
 * - be able to add a new book to the library.
 * - be able to remove a book from the library.
 * - be able to list books by Category.
 * - be able to list books by Author.
 * - be able to mark a book as reserved.
 * - be able to unreserve a book.
*/

function Book(isbn, title, author, category) {
    /**
     * @type {string}
     */
    this.isbn = isbn
    /**
     * @type {string}
     */
    this.title = title;
    /**
     * @type {string}
     */
    this.author = author;
    /**
     * @type {string}
     */
    this.category = category;

    this.describe = () => {
        return `${this.title} by ${this.author}`
    }
}

function Library(name, owner, location, phone_number) {
    /**
     * library name
     * @type {string}
     */
    this.name = name;
    /**
     * library owner
     * @type {string | null}
     */
    this.owner = owner;
    /**
     * library location
     * @type {string}
     */
    this.location = location;
    /**
     * library phone number
     * @type {string}
     */
    this.phone_number = phone_number;
    /**
     * holds the list of books
     * @type {Book[]}
     */
    this.books = [];

    /**
     * an object that keeps the counter for each book and how many copies we have
     * @example {'54535349582':2, '73458321':20, }
     * @type {{[key:string]: number}}
     */
    this.inventory = {}
    /**
     * holds the isbn of reserved books
     * @type {string[]}
     */
    this.reserved = [];

    /**
     * adds a new book to the library.
     * @param {Book} book book to add to library
     * @param {number} copies number of copies to add to the library.
     */
    this.add_book = function (book, copies = 1) {
        // this.books.push(book)

        // approach 1: we can check if the book exists, don't add it in that case.

        // const search = (book_isbn) => {
        //     for (let i = 0; i < this.books.length; i++) {
        //         const book = this.books[i];
        //         if (book.isbn == book_isbn) {
        //             return book;
        //         }
        //     }
        //     return null;
        // }

        // const found_book = this.books.find((b) => b.isbn === book.isbn)
        // if (!found_book) this.books.push(book)
        // else { console.log(`Book already exists in the list!`) }

        // approach 2: keep track of number of copies of the same book.

        // if this exists and is greater than 0, than that book already exists in the library
        const has_book = this.inventory[book.isbn]
        if (has_book) this.inventory[book.isbn] += copies
        else {
            this.books.push(book);
            this.inventory[book.isbn] = copies;
        }
    }

    this.remove_book = (book_isbn) => {
        if (this.inventory[book_isbn] > 1) {
            // all these are equivilant.
            // this.inventory[book_isbn] = this.inventory[book_isbn] - 1
            // this.inventory[book_isbn] -= 1
            this.inventory[book_isbn]--
        } else if (this.inventory[book_isbn] === 1) {
            this.books = this.books.filter((book) => book.isbn !== book_isbn)
            this.inventory[book_isbn]--
        }
    }

    this.list_books = () => {
        if (this.books.length === 0) {
            console.log(`No books found in Library "${this.name}"`);
        } else {
            console.log(`Books (${this.books.length}):`)
            this.books.forEach(book => console.log(`| ${book.describe()} (${this.inventory[book.isbn]})`))
        }
    }

    /**
     * lists all the books for the given category
     * @param {string} category category to filter by
     */
    this.list_books_by_category = (category) => {
        const books_in_category = this.books.filter(book => book.category.toLowerCase() === category.toLowerCase())
        if (books_in_category.length === 0) {
            console.log(`No books found for category "${category}"`);
            return;
        }
        console.log(`Books in ${category} (${books_in_category.length}):`)
        books_in_category.forEach(book => console.log(`| ${book.describe()}`))
    }

    /**
     * reserves a book for a user.
     * @param {Book} book book to reserve
     */
    this.reserve_book = (book) => {
        const found = this.books.find(b => book.isbn === b.isbn);

        if (!found) {
            console.log(`${book.describe()} not found in library!`)
            return;
        }

        const is_reserved = this.reserved.indexOf(book.isbn);

        if (is_reserved === -1) this.reserved.push(book.isbn)
        else console.log(`${book.describe()} is already reserved!`)
    }

    /**
     * unreserves a book for a user.
     * @param {Book} book book to unreserve
     */
    this.return_book = (book) => {
        this.reserved = this.reserved.filter(b => b !== book.isbn)
    }
}

const book1 = new Book('23241239123', '48 Laws of Power', 'Robert Greene', 'Personal Development')
const book2 = new Book('23441239123', 'Emotional Intelligence', 'Daniel Goleman', 'Personal Development')
const book3 = new Book('23321239123', 'Thinking, Fast and slow', 'Daniel Kahneman', 'Personal Development')
const book4 = new Book('83441239123', 'Field Guide to Trapping, Gathering & Cooking', 'Canterbury', 'Travel Guide')
const book5 = new Book('83434123912', 'Eloquent JavaScript, 3rd Edition', 'Marijn Haverbeke', 'Programming')

const myLib = new Library("Personal", "Ibrahim", '', '')

myLib.add_book(book1, 9)
myLib.list_books()
myLib.add_book(book2)
myLib.add_book(book3)
myLib.add_book(book4)
myLib.add_book(book5)
// myLib.remove_book(book1);
// myLib.list_books_by_category('Personal Development');
// myLib.reserve_book(book1);
// myLib.return_book(book1) 