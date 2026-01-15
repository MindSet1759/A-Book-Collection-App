


let books = JSON.parse(localStorage.getItem("books")) || [];
let view = "grid";

const collection = document.getElementById("collection");

document.getElementById("addBtn").addEventListener("click", addBook);
document.getElementById("searchInput").addEventListener("input", displayBooks);
document.getElementById("filterRating").addEventListener("change", displayBooks);
document.getElementById("viewBtn").addEventListener("click", toggleView);

function storeBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
  const title = document.getElementById("titleInput").value.trim();
  const rating = Number(document.getElementById("ratingInput").value || 0);
  const notes = document.getElementById("notesInput").value;

  if (!title) return;

  books.push({
    id: Date.now(),
    title,
    rating,
    notes,
    status: "unread"
  });

  storeBooks();
  displayBooks();

  document.getElementById("titleInput").value = "";
  document.getElementById("ratingInput").value = "";
  document.getElementById("notesInput").value = "";
}

function toggleStatus(id) {
  const book = books.find(b => b.id === id);
  book.status = book.status === "read" ? "unread" : "read";
  storeBooks();
  displayBooks();
}

function toggleView() {
  view = view === "grid" ? "list" : "grid";
  displayBooks();
}

function displayBooks() {
  collection.className = `collection ${view}`;
  collection.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const minRating = Number(document.getElementById("filterRating").value || 0);

  books
    .filter(book =>
      book.title.toLowerCase().includes(search) &&
      book.rating >= minRating
    )
    .forEach(book => {
      const div = document.createElement("div");
      div.className = `book ${book.status}`;

      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>Rating: ⭐ ${book.rating || "N/A"}</p>
        <p>${book.notes}</p>
        <button onclick="toggleStatus(${book.id})">
          ${book.status === "read" ? "Move to Reading List" : "Mark as Read"}
        </button>
      `;

      collection.appendChild(div);
    });
}

displayBooks();
