import React from 'react';
import { Login } from '../Pages/LoginPage/Login';
import { AppRoutes } from './AppRoutes';
import { Routes, Route } from 'react-router-dom';
import { Register } from '../Pages/RegisterPage/Register';

export const MainRoute = () => {
  return (
    <Routes>
      <Route path={AppRoutes.login} element={<Login />} />
      <Route path={AppRoutes.register} element={<Register />} />
    </Routes>
  );
};
