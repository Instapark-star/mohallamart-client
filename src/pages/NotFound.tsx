const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 rounded-full bg-white text-black font-semibold transition hover:opacity-90"
      >
        Go to Homepage
      </a>
    </main>
  )
}

export default NotFoundPage
