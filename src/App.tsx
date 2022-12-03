import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import {Route, Routes} from "react-router-dom";
import FormQuote from "./components/FormQuote/FormQuote";

function App() {
  return (
    <div className="App">
      <Header/>

      <main className="main-block">
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/quotes" element={(<Home/>)}/>
          <Route path="/quotes/:category" element={(<Home/>)}/>
          <Route path="/add-quote" element={(<FormQuote/>)}/>
          <Route path="/quotes/:id/edit" element={(<FormQuote/>)}/>
          <Route path="*" element={(<h1>Not found!</h1>)}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
