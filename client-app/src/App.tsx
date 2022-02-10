import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useRoutes } from 'react-router-dom';
import routes from "./routes"

function App() {
  let element = useRoutes(routes)
  return (
    <>
      {element}
    </>
    //   <Routes>
    //     <Route path="/" element={<DefaultLayout />}>
    //       <Route index element={<HomePage />} />

    //     </Route>
    //   <Route element={<AuthLayout />}>
    //       <Route path="/auth/login" element={<LogIn />} />
    //       <Route path="/auth/signup" element={<SignUp />} />

    //     </Route>
    //  <Route path="*" element={<NotFound />} /> 
    //  </Routes>
  );
}

export default App;
