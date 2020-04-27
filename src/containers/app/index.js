import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CityWeatherPage from '../city-weather'
import DetailWeatherPage from '../details-weather'

export default () => {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/" component={DetailWeatherPage} />
        <Route path="/about" component={CityWeatherPage} />
      </Switch>
    </div>
  </Router>
  )
}
