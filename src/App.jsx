import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  { element: <Layout />, children: [
    { path: '/', element: <Home /> },
    { path: '/products/:id', element: <ProductDetails /> },
    { path: '/cart', element: <Cart /> },
    { path: '*', element: <NotFound /> },
  ] },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
