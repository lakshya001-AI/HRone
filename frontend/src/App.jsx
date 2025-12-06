import { useState } from 'react'
import toast , {Toaster} from 'react-hot-toast'
import Style from "./App.module.css"
import AddDetails from './Components/AddDetails'
import ShowDetails from './Components/ShowDetails'
function App() {
  return (
    <>
    <div className={Style.mainDiv}>
      {/* Here we are going to create a full stack application to store the users details */}
      {/* component for taking details */}
      <AddDetails/>
      {/* component for  showing the details in grid format*/}
      <ShowDetails/>
    </div>
    <Toaster/>
    </>
  )
}

export default App
