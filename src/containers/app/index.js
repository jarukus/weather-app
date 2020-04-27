import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CityWeatherPage from '@containers/city-weather'
import DetailWeatherPage from '@containers/details-weather'
import Layout from '@components/layout'

function Routes() {
	return (
		<Switch>
			<Route exact path='/' component={CityWeatherPage} />
			<Route path='/:city' component={DetailWeatherPage} />
		</Switch>
	)
}

export default () => {
	return (
		<Router>
			<Layout>
				<Routes />
			</Layout>
		</Router>
	)
}
