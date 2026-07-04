import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2 text-lg text-gray-500">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-lime-500 px-5 py-2 font-semibold text-black hover:bg-lime-400 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;