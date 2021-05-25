import React, { Suspense } from 'react';
import {  BrowserRouter,Route, Switch } from "react-router-dom";
import Auth from "./auth/auth";
// pages for this product
import LandingPage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import NavBar from "./components/NavBar/NavBar";
import MovieDetail from "./components/MovieDetails/MovieDetails"

// import MovieDetail from "./components/MovieDetails"
import FavoritePage from "./components/FavoritePage/FavoritPage"
function App() {
  return (
    <BrowserRouter     fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/movie/:movieId" component={MovieDetail} />
          <Route exact path="/favorite" component={FavoritePage} />
        </Switch>
      </div>
     
    </BrowserRouter>
  );
}

export default App;