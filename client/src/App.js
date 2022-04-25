import React from 'react';
import {  BrowserRouter,Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Movies from "./Pages/Movies/Movies";
import Trending from "./Pages/Trending/Trending";
import TvSeries from './Pages/TvSeries/TvSeries';
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={TvSeries} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <NavBar />
    </BrowserRouter>
  );
}

export default App;