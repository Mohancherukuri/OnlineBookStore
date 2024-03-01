
function addToCart(newBooks,existingBooks){
    console.log(newBooks)
    newBooks.forEach(book2 => {
        const index = existingBooks.findIndex(book1 => book1._id === book2._id);
        if (index !== -1) {
            existingBooks[index].qty += book2.qty;
        }
        else{
            existingBooks.push(book2)
        }
    })
    return existingBooks;
}

module.exports = {addToCart}