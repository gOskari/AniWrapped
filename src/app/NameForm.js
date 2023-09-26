import { redirect } from 'next/navigation'


export default function NameForm() {
  async function handleName(stuff) {
    'use server'
    redirect(`/profile/${stuff.get('name')}`); // Navigate to new route
  }

  return(
    <div>
      <form action={handleName}>
        <label for="name" className='text-black'>Name:</label>
        <input type="text" placeholder="Anilist Username" id="name" name="name" className='text-2xl p-2 bg-gray-200 text-black rounded'/>
        <button type="submit" className='mt-2 p-2 bg-transparent-500 text-white rounded'>OK</button>
      </form>
    </div>
  )
}