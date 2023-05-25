import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Home, SingleProductPage, Login, Register, Dashboard, PrivateRoute, Cart } from './pages'
import './App.css'
import { Navigation } from './components'
import { useSelector } from 'react-redux'
function App() {
  const { userData } = useSelector(state => state.user)
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes location={background || location}>
          <Route path=':productId' element={<SingleProductPage />} />
          <Route path='/' element={<Home />}>
            <Route path=':productId' element={<SingleProductPage />} />
          </Route>

          <Route path='/cart' element={<Cart />} />

          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route index path='/login' element={!userData ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/register' element={!userData ? <Register /> : <Navigate to={'/'} />} />
        </Routes>

        {background && (
          <Routes>
            <Route path=":productId" element={<SingleProductPage />} />
          </Routes>
        )}
      </main>
      <footer>
      </footer>
    </div>
  )
}
export default App

