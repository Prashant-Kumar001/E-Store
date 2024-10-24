// src/App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { fetchAllProducts } from './features/cart/cartSlice'; // Import the action to fetch products

// Lazy load the pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const SingleProduct = lazy(() => import('./pages/SingleProduct'));
const RelatedProducts = lazy(() => import('./pages/RelativeProducts'));
const Loading = lazy(() => import('./components/ILoading'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

// Create the router with route configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // The common layout for all pages
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'product',
        element: (
          <Suspense fallback={<Loading />}>
            <SingleProduct />
          </Suspense>
        ),
      },
      {
        path: 'relative',
        element: (
          <Suspense fallback={<Loading />}>
            <RelatedProducts />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(fetchAllProducts());
    };

    // Fetch products when the app loads
    fetchProducts();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
