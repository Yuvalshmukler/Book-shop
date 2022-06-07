
var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוך הבא לחנות הספרים שלי'
    },
    'filter-by-txt': { //placeholder
        en: "Start typing...",
        he: "...חיפוש"
    },
    'filter-by-price': {
        en: 'Max Price',
        he: 'מחיר מקסימלי'
    },
    "filter-by-rate": {
        en: 'Min Rate',
        he: 'דירוג'
    },
    'create-new-book': {
        en: 'Create new book',
        he: 'ליצור ספר חדש'
    },
    'book-id': {
        en: 'Id',
        he: 'מזהה'
    },
    'book-title': {
        en: 'Title',
        he: 'כותרת'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'close-modal': {
        en: 'close',
        he: 'יציאה'
    },
    'read-btn': {
        en: 'Read',
        he: "תקציר"
    },
    "update-btn": {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'למחוק'
    }

}

var gCurrLang = 'en'
function getTrans(transKey){
    var keyTrans = gTrans[transKey]
    if(!transKey) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if(!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        console.log(el.dataset);
        
        var txt = getTrans(transKey)
    })
}

function setLang(lang) {
    gCurrLang = lang
}