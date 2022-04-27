import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Movies from "./Pages/Movies/Movies";
import TvSeries from "./Pages/TvSeries/TvSeries";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import InTheaters from "./Pages/InTheaters/InTheaters";
import WatchList from "./Pages/WatchList/WatchList";
import { Container } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/inTheaters" component={InTheaters}/>
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={TvSeries} />
            <Route path="/watchList" component={WatchList}/>
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
