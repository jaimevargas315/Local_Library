
function findAuthorById(authors, id) 
{
  // uses find array method to return the author that matches the id argument
  return authors.find((author)=> author.id === id);
}

function findBookById(books, id) 
{
  // uses find array method to return the book that matches the id argument
  return books.find((book)=> book.id === id); 
}

function partitionBooksByBorrowedStatus(books) 
{
  /*
  I created two sorted arrays, one array uses the filter method so it is filled with books that arent returned
  The second array uses the filter method so it is filled by books that have been returned 
  I created a 3rd empty array, then pushed both sorted arrays into it, so now we have our final partitioned array
  */
  let sort1= books.filter((book)=>!book.borrows[0].returned);
  let sort2= books.filter((book)=>book.borrows[0].returned);
  let answer = [];
  answer.push(sort1);
  answer.push(sort2);
  return answer;
}

function getBorrowersForBook(book, accounts) 
{
  // create an array that equals book.borrows
  let borrowers = book.borrows;
  //step through borrowers array
  for (let borrow in borrowers)
  {
    // person variable is assigned to the result of finding an account.id that matches the borrow id 
    let person = accounts.find((account)=> account.id === borrowers[borrow].id);
    Object.assign(borrowers[borrow], person);
  }
  // create borrows array, fill it with lines from borrowers, cut it to only 10 lines, then return it
  let result = []
  borrowers.forEach((line)=> result.push(line));
  result.length=10;
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
 