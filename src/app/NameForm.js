import { redirect } from 'next/navigation'


export default function NameForm() {
  async function handleName(stuff) {
    'use server'
    redirect(`/profile/${stuff.get('name')}`); // Navigate to new route
  }

  return(
    <div>
      <form action={handleName}>
        <label for="name" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Name:</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="text" id="name" name="name" className="block w-full h-12 p-4 pl-10 text-lg text-secondary-color border border-secondary-color rounded-lg bg-primary-color" placeholder="Anilist Username" />
          <button type="submit" className="text-primary-color absolute top-1/2 transform -translate-y-1/2 right-2.5 bg-secondary-color hover:bg-secondary-color-dark focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>
    </div>
  )
}