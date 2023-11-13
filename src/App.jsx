import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Invoices from './scenes/invoices';
import Contacts from './scenes/contacts';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Geography from './scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';
import Guard from './components/Guard/Guard';
import LoginForm from './scenes/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllPoducts from './scenes/invoices';
import AllCategories from './scenes/categories/AllCategories';
import Profile from './scenes/profile/Profile';
import AddProduct from './scenes/invoices/AddProduct';
import AddCategory from './scenes/categories/AddCategory';
import UpdateUser from './scenes/contacts/UpdateUser';
import UpdateCategory from './scenes/categories/EditCategory';
import UpdateProduct from './scenes/invoices/UpdateProduct';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route
                path='/home'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Contacts />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/products'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <AllPoducts />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/categories'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <AllCategories />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/profile'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Profile />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/reports'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <FAQ />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/addUser'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Form />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/addProduct'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <AddProduct />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/addCategory'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <AddCategory />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/updateUser/:id'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <UpdateUser />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/updateCategory/:id'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <UpdateCategory />
                    </main>
                  </Guard>
                }
              />
              <Route
                path='/updateProduct/:id'
                element={
                  <Guard>
                    <Sidebar isSidebar={isSidebar} />
                    <main className='content'>
                      <Topbar setIsSidebar={setIsSidebar} />
                      <UpdateProduct />
                    </main>
                  </Guard>
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
