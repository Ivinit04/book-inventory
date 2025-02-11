import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import BookDetails from "../components/BookDetails";
import Form from "../components/Form";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/book/:id", element: <BookDetails /> },
  { path: "/add", element: <Form /> },
  { path: "/edit/:id", element: <Form /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
