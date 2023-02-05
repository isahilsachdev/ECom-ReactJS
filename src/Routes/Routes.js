import React, { lazy } from "react";
import Headers from "../Components/Header/Headers";
import { Route, Routes } from 'react-router-dom';
import CartItems from "../Pages/CartItems/CartItems";

const Home = lazy(() => import('../Pages/Home/Home'));

export const RoutesPage = () => {
  return (
    <>
      <Headers />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cart" element={<CartItems />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </>
  );
};
