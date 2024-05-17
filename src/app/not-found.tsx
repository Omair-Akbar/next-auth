import React from 'react'

const notFound = () => {
  return (
    <main className="bg-gray-100 h-screen flex flex-col justify-center items-center">
    <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
        <a href="/" className="bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded">Go Home</a>
    </div>
</main>
  )
}

export default notFound
