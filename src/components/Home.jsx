import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, setBooks } from "../redux/bookSlice";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://67a9e88f65ab088ea7e4ece0.mockapi.io/api/books")
      .then((response) => {
        dispatch(setBooks(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const bookDelete = (id) => {
    axios
      .delete(`https://67a9e88f65ab088ea7e4ece0.mockapi.io/api/books/${id}`)
      .then((response) => {
        dispatch(deleteBook(response.data.id));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  return isLoading ? (
    <div className="container mx-auto p-4 text-center text-lg font-semibold">
      Loading...
    </div>
  ) : (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Book Inventory Management
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + Add Book
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border p-3">Title</th>
              <th className="border p-3">Author</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="text-gray-700 text-sm md:text-base">
                <td className="border p-3 break-words max-w-[150px]">{book.title}</td>
                <td className="border p-3 break-words max-w-[150px]">{book.author}</td>
                <td className="border p-3 flex flex-col md:flex-row gap-2 justify-center items-center">
                  <Link
                    to={`/book/${book.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs md:text-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${book.id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-xs md:text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => bookDelete(book.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
