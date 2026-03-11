// import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//import './index.css'
import App from './App'

//createRoot(document.getElementById('root')).render(
 // <StrictMode>
   //<App />
  //</StrictMode>,
//)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

/*
let counter = 1

ReactDOM.createRoot(document.getElementById('root'))
const refresh = () => {
  root.render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
*/