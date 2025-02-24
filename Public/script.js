document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const bookList = document.getElementById("bookList");

    // Fetch books from API
    async function fetchBooks() {
        const res = await fetch("http://localhost:5000/books");
        const books = await res.json();
        bookList.innerHTML = "";
        books.forEach((book) => {
            const li = document.createElement("li");
            li.innerHTML = `${book.title} by ${book.author} (${book.year})
                <button onclick="deleteBook('${book._id}')">Delete</button>`;
            bookList.appendChild(li);
        });
    }

    // Add book
    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const year = document.getElementById("year").value;

        await fetch("http://localhost:5000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, year }),
        });

        bookForm.reset();
        fetchBooks();
    });

    // Delete book
    window.deleteBook = async (id) => {
        await fetch(`http://localhost:5000/books/${id}`, {
            method: "DELETE",
        });
        fetchBooks();
    };

    fetchBooks();
});
