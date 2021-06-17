
// helper function that is used later in the file to help sort object
function sortObjectByValues(obj)
{ const keys = Object.keys(obj); return keys.sort((keyA,keyB) => { if(obj[keyA] > obj[keyB]){ return -1;

}else if(obj[keyB] > obj[keyA]){
  return 1;
}else{
  return 0;
}
})}


function getTotalBooksCount(books) 
{
  // uses map array function to create an array of the book id's, then returns the length
  return books.map((book)=>book.id).length;
}
function getTotalAccountsCount(accounts) 
{
    // uses map array function to create an array of the account id's, then returns the length
  return accounts.map((account)=>account.id).length;
}

function getBooksBorrowedCount(books) 
{
  // filters through the books object by returned value, then returns the length 
  return books.filter((book)=>!book.borrows[0].returned).length;
}

function getMostCommonGenres(books) 
{
  // uses reduce method to count common genres
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  // calling helper function to help sort 
  const sorted = sortObjectByValues(count);
  // creating output formatting then returning 
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);

}

function getMostPopularBooks(books) 
{
  let result = [];
  const copy = books;
  // creates a copy of books, then pushes the title and amount of borrows into result
  copy.forEach((book) => {
    result.push({ name: book.title, count: book.borrows.length });
  });
  // sort result array by book count
  result = result.sort((book1, book2) =>
    book1.count < book2.count ? 1 : -1
  );
  // cuts result array to only 5 lines, then returns result
  result.length = 5;
  return result;
}

function getMostPopularAuthors(books, authors) 
{
  //looks through authors and return list of authors without duplication
  const uniqueAuthor = authors.filter(
    (author, index, array) =>
      array.findIndex((name) => name.id === author.id) === index
  );
  //for each author, go through books and count the number of borrows in each book
  const result = [];
  uniqueAuthor.forEach((author) => {
    let counter = 0;
    for (let book in books) {
      // steps through each book and increments counter based on amount of borrows
      if (books[book].authorId === author.id) {
        counter += books[book].borrows.length;
      }
    }
    // push author full name as well as their count
    result.push({
      name: `${author.name.first} ${author.name.last}`,
      count: counter,
    });
  });
  // sort authors by their count
  result.sort((author1, author2) =>
    author1.count < author2.count ? 1 : -1
  );
  // cut to only 5 lines then return result
  result.length = 5;
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
