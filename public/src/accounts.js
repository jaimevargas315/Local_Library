
function findAccountById(accounts, id) 
{
  // using find array method to find matching account id, then returning what was found
  let found = accounts.find((account) => account.id === id)
  return found;
}

function sortAccountsByLastName(accounts) 
{
  // using sort array method to sort alphabetically by last name
  accounts.sort((account1, account2) => (account1.name.last > account2.name.last ? 1 : -1 ));
  return accounts;
}

function getTotalNumberOfBorrows(account, books) 
{ 
  // filters through the array of books, creates an array of matches to the account id, returns the length of that array
  // to the redue method, which counts the total amount of borrows for each book
  return books.reduce((acc, book) => acc+= book.borrows.filter((borrow)=> borrow.id === account.id).length, 0);
}

function getBooksPossessedByAccount(account, books, authors) 
{
  // creates a map of the books where the author.id matches the book.authorId
  // then filters that map for books that aren't returned
  // then returns the array
  return books.filter((book)=>{
  const recent= book.borrows[0];
  return !recent.returned && recent.id === account.id;
  }).map((book)=> {
    const author = authors.find((author)=> author.id === book.authorId)
    return {...book,author}
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
