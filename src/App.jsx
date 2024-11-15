import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import SideNav from "./routes/SideNav";
import CreatePost from "./routes/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      {/* <SideNav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost></CreatePost>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
