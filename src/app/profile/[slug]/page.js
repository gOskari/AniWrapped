import Data from '../../Data.js'

export default function Page({ params }) {
  console.log(params)
  //return <div>moi {params.slug}</div>
    return <Data profile_name={params.name} />
  }