process.env.NODE_ENV === "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testBook_isbn;

beforeEach(async () => {
  const results = await db.query(` 
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
      VALUES(
        '010101',
        'http://a.co/testBook',
        'Testing DEV',
        'English',
        169,
        'Nothing publishers',
        'my first book', 2022)
      RETURNING isbn`);

  //   console.log(results.rows[0].isbn);
  testBook_isbn = results.rows[0].isbn;
});

// describe("POST /books", () => {
//   test("Creates a new book", async () => {
//     const resp = await request(app).post("/books").send({
//       isbn: "01022101",
//       amazon_url: "http://a.co/testBook2",
//       author: "Testing DEV22",
//       language: "Spanish",
//       pages: 690,
//       publisher: "University of TESTING ",
//       title: "Power of TESTING",
//       year: 2022,
//     });
//     expect(resp.statusCode).toBe(201);
//     expect(resp.body.book.isbn).toEqual("01022101");
//   });
// });

// describe("GET /books", () => {
//   test("Retrieves list of books", async () => {
//     const resp = await request(app).get("/books");
//     const books = resp.body;
//     // console.log(books);
//     expect(books[0]);
//   });
// });

describe("GET /books/:isbn", () => {
  test("Retrieves a single book", async () => {
    const resp = await request(app).get(`/books/${testBook_isbn}`);
    const book = resp.body;
    // console.log(book);
    // expect(book);
  });
});

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  await db.end();
});
