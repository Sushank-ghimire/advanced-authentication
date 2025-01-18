import { Link } from "@tanstack/react-router";
const NotFoundPage = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="text-8xl font-extrabold">404</h1>
        </div>
        <div className="mb-6">
          <h3 className="text-5xl font-semibold">Look like you're lost</h3>
        </div>
        <p className="text-lg mb-6">
          The page you are looking for is not available!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
