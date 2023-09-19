import { redirect } from 'next/navigation'


export default function NameForm() {
  async function handleName(stuff) {
    'use server'
    redirect(`/profile/${stuff.get('name')}`); // Navigate to new route
  }

  return(
    <div>
      <form action={handleName}>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"/>
        <button type="submit">OK</button>
      </form>
    </div>
  )
}