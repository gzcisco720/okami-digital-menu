
import { Route, Routes } from 'react-router';
import './App.scss'
import CssBaseline from '@mui/material/CssBaseline';
import { Menu } from './pages/Menu';
import { AdminMenuList } from './pages/AdminMenuList';
import { SignIn } from './pages/SignIn';
import { AdminMenuItems } from './pages/AdminMenuItems';
import { ProtectedRoute } from './layout/ProtectedRoute';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/menu/:branch' element={<Menu />}/>
          <Route path='/signIn' element={<SignIn />}/>
          <Route path='/admin' element={<ProtectedRoute />}>
            <Route index element={<AdminMenuList />}/>
            <Route path=':branch' element={<AdminMenuItems />}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
