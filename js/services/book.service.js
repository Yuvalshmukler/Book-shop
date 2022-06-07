'use strict'


const gTitles = ['Learning Laravel', 'Beginning with Laravel', 'Java for dev']
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5
var gBooks
var gId = 0
var gPageIdx = 0
var gFilterBy = {
    maxPrice: 0,
    minRate: 0,
    txt: ''
}

_createBooks()


function restartGame() {
    gFilterBy = {
        maxPrice: 0,
        minRate: 0,
        txt: ''
    }
    gPageIdx = 0
    gId = 0

}


function getBooks() {
    var books = getBooksForDisplay()
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function getBooksForDisplay() {
    var books = gBooks
    //if (!gFilterBy) return books

    if (gFilterBy.txt) {
        books = books.filter(book => book.title.includes(gFilterBy.txt))
    }
    if (gFilterBy.minRate) {
        books = books.filter(book => book.rate >= +gFilterBy.minRate)
        console.log(books);

    }
    if (gFilterBy.maxPrice) {
        books = books.filter(book => book.price <= +gFilterBy.maxPrice)
        console.log(books);
    }
    return books
}

function onSetLang() {

}
function setFilterBy(filterBy) {
    if (filterBy.maxPrice) gFilterBy.maxPrice = +filterBy.maxPrice
    if (filterBy.minRate) gFilterBy.minRate = +filterBy.minRate
    if (filterBy.txt) gFilterBy.txt = filterBy.txt
    return gFilterBy
}
function _createBook(title = makeLorem(4)) {
    return {
        id: makeId(2),
        desc: makeLorem(90),
        title,
        price: getRandomIntInclusive(1, 25),
        rate: 0
    }
}


function getTitles() {
    return gTitles
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 15; i++) {
            books.push(_createBook())
        }
    }
    gBooks = books
    console.log(gBooks);
    _saveBooksToStorage()
}


function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id)
    return book
}

function deleteBookById(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()

}
/* function updateBook(bookId){
    const book = gBook.find(book =>  )
}
 */
function addBook(title, price) {
    const book = _createBook(title, price)
    console.log(book);
    gBooks.push(book)
    console.log(gBooks);
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book

}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}


function setRate(book, diff) {
    book.rate += diff
    _saveBooksToStorage()
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0
}

///////////////////////////////////////////////
