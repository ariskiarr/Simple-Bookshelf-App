document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const unreadBooksContainer = document.getElementById("unread-books");
    const readBooksContainer = document.getElementById("read-books");
    
    let books = JSON.parse(localStorage.getItem("books")) || [];
    
    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }
    
    function renderBooks() {
        unreadBooksContainer.innerHTML = "";
        readBooksContainer.innerHTML = "";
        
        books.forEach((book, index) => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book-item");
            bookElement.innerHTML = `
                <p><strong>${book.title}</strong> - ${book.author} (${book.year})</p>
                <button class="toggle-read" data-index="${index}">
                    ${book.isRead ? "Kembali ke Belum Dibaca" : "Sudah Dibaca"}
                </button>
                <button class="delete" data-index="${index}">Hapus</button>
            `;
            
            if (book.isRead) {
                readBooksContainer.appendChild(bookElement);
            } else {
                unreadBooksContainer.appendChild(bookElement);
            }
        });
    }
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const year = document.getElementById("year").value;
        
        books.push({ title, author, year, isRead: false });
        saveBooks();
        renderBooks();
        form.reset();
    });
    
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("toggle-read")) {
            const index = event.target.getAttribute("data-index");
            books[index].isRead = !books[index].isRead;
            saveBooks();
            renderBooks();
        }
        
        if (event.target.classList.contains("delete")) {
            const index = event.target.getAttribute("data-index");
            books.splice(index, 1);
            saveBooks();
            renderBooks();
        }
    });
    
    renderBooks();
});
