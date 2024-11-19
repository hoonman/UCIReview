import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import SideNav from "./routes/SideNav";
import CreatePost from "./routes/CreatePost";
import AllReviews from './routes/AllReviews';
import EditPost from './routes/EditPost';
import Search from './routes/Search';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      {/* <SideNav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<AllReviews></AllReviews>} />
        <Route path="/create" element={<CreatePost></CreatePost>}></Route>
        <Route path="/reviews/edit/:id" element={<EditPost></EditPost>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        {/* <Route path="/search:" element={<Search></Search>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
