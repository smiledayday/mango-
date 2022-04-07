import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/LoginNew'
import CreateDocs from './pages/docs/CreateDocs'
import './App.css'

// rem 适配
const htmlDom = document.getElementsByTagName('html')[0]
function setHtmlFontSize () {
  const ratio = 100 / 750
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  htmlDom.style.fontSize = ratio * htmlWidth + 'px'
}
window.addEventListener('resize', setHtmlFontSize)
setHtmlFontSize()

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/index' element={<Home />} />
        <Route path='/docs/create' element={<CreateDocs />} />
      </Routes>
    </div>
  )
}

export default App
