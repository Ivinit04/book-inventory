import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function BookDetails() {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.find((book) => book.id === id)
  );

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Book Details
      </h1>
      <div className="p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">{book.title}</h2>
        <p className="text-gray-600 mt-2">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Published Date:</strong> {book.publishedDate}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Description:</strong> {book.description}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <Link
          to="/"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BookDetails;
