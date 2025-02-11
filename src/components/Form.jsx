import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookData = useSelector((state) =>
    state.books.find((book) => book.id === id)
  );
  const [book, setBook] = useState(id ? bookData : {
    title: "",
    author: "",
    publishedDate: "",
    publisher: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!book.title.trim()) newErrors.title = "Title is required.";
    if(!book.publishedDate) newErrors.publishedDate = "Date is required";
    if (!book.author || !/^[a-zA-Z\s.]{4,}$/.test(book.author))
      newErrors.author =
        "Author must be at least 4 characters long and contain only letters.";
    if (!book.publisher || !/^[a-zA-Z\s.,]{4,}$/.test(book.publisher))
      newErrors.publisher =
        "Publisher must be at least 4 characters long and contain only letters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    if (id) {
      axios
        .put(
          `https://67a9e88f65ab088ea7e4ece0.mockapi.io/api/books/${id}`,
          book
        )
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating book:", error))
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("https://67a9e88f65ab088ea7e4ece0.mockapi.io/api/books", book)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error adding book:", error))
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        
        <input
          type="date"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.publishedDate && <p className="text-red-500 text-sm">{errors.publishedDate}</p>}
        
        <input
          type="text"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
          placeholder="Publisher"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher}</p>}
        
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : id ? "Update Book" : "Add Book"}
        </button>
      </form>
      <div className="mt-4 text-center">
      <Link
        to="/"
        className="w-full inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
    </div>
  );
  
}

export default Form;
