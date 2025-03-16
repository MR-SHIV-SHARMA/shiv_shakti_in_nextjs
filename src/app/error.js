"use client"
export default function ErrorPage({ error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-500 mt-2">
        {error?.message || "An unexpected error occurred."}
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go Back Home
      </a>
    </div>
  );
}
