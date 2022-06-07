'use strict'

var gCurrBook


function onInit() {
    renderBooks()
    renderFilterByQueryStringParams()
    restartGame()
}

function renderBooks() {
    var books = getBooks()
    console.log(books);
    var strHTML = books.map(
        (book) => `
       <tr>
           <td>${book.id}</td>
           <td>${book.title}</td>
           <td>${book.price}$</td>
           <td>
               <button onClick="onReadBook('${book.id}')"class="action-read" data-trans="read-btn">Read</button>
               <button onClick="onUpdateBook('${book.id}')"class="action-update" data-trans="update-btn">Update</button>
               <button onClick="onDeleteBook('${book.id}')"class="action-delete" data-trans="delete-btn">Delete</button>
           </td>
       </tr>

`
    )

    document.querySelector('tbody').innerHTML = strHTML.join('')
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
    elModal.dataset.bookId = bookId
    //console.log(elModal.dataset);
    //gCurrBook = book
    var elRateDisplay = document.querySelector('.onRange')
    elRateDisplay.innerText = book.rate

}


function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
    var elRangeBtn = document.querySelector('.onRange')
    elRangeBtn.innerText = 0
}
function onDeleteBook(bookId) {
    deleteBookById(bookId)
    renderBooks()

}
function onAddBook() {
    var title = prompt('Book title')
    console.log(title);
    var price = prompt('price?')
    if (title) {
        const book = addBook(title, price)
        renderBooks()
    }
}
function onUpdateBook(bookId) {
    var newPrice = prompt('Enter a new price')
    if (!newPrice) return
    newPrice += '$'
    updateBook(bookId, newPrice)
    renderBooks()
}

function onRange(diff) {
    //console.log(diff);
    var elRateDisplay = document.querySelector('.onRange')
    var elModal = document.querySelector('.modal')

    const book = getBookById(elModal.dataset.bookId)
    if (+elRateDisplay.innerText === 10 && diff === 1) return
    if (+elRateDisplay.innerText === 0 && diff === -1) return

    setRate(book, diff)
    elRateDisplay.innerText = book.rate
}

function onSetFilterBy(filterBy) {
    filterBy = setFilterBy(filterBy)
    renderBooks()

    const queryStringParams = `?price=${filterBy.maxPrice}&rate=${filterBy.minRate}&txt=${filterBy.txt}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('price') || 0,
        minRate: +queryStringParams.get('rate') || 0,
        txt: queryStringParams.get('txt') || '',
    }


    if (!filterBy.txt && !filterBy.maxPrice && filterBy.minRate) return
    onSetFilterBy(filterBy)

}

function onNextPage() {
    nextPage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)

    if(lang === 'he')document.body.classList.add('rtl') //todo
    else document.body.classList.remove('rtl')
    
    doTrans() ///todo
    renderBooks()
}