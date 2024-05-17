import React from 'react'
import AllRoutes from './AllRoutes'
import { LoaderProvider } from './context/LoaderContext/LoaderProvider'

const App = () => {
  return (
    <>
     <LoaderProvider>
     <AllRoutes/> 
     </LoaderProvider>
    </>
  )
}

export default App
