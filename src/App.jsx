//https://bg.ibelick.com/ refer here for background
import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar  from './components/Navbar'
import Manager from './components/Manager'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<> <Navbar/> <Home/>  <Manager/> </>
    },
    {
      path:"/about",
      element:<> <Navbar/> <About/> </>
    },
    {
      path:"/contact",
      element:<> <Navbar/> <Contact/> </>
    },

   ])
   return (
    <>
     <RouterProvider router ={router}/>
    </>
  )
}

export default App
