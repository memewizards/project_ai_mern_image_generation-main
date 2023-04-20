import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  return <Navigate to="/" replace />;
};

export default NotFound;