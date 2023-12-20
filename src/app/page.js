import NameForm from './NameForm.js'


export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl'>AniWrapped</h1>
        <p className='pb-20'>
      <span className='text-secondary-color-dark'>Search and compare among </span>
      <span className='text-secondary-color-dark'></span>
      <span className='text-secondary-color-dark'>AniList users!</span>
      </p>
      <div className='pb-5'><NameForm/></div>
      </main>
  )
}
