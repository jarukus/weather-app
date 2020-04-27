import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Button,
	Input,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Spinner,
	Table,
	Alert,
} from 'reactstrap'
import { getCityWeather } from '@store/actions'
import { debounceDecorator } from '@components/utils'

export default () => {
	const { isLoading, weather, last5Cities, notFound } = useSelector(
		({ isLoading, weather, last5Cities, notFound }) => {
			return { isLoading, weather, last5Cities, notFound }
		}
	)

	const dispatch = useDispatch()

	const onChange = debounceDecorator((city) => {
		city.length > 2 && dispatch(getCityWeather({ city }))
	}, 500)

	return (
		<>
			<Col sm='12' className='mb-5'>
				<h1>Weather App</h1>
			</Col>
			<Col sm='12' className='mb-5'>
				<div className='d-flex position-relative'>
					<Input
						placeholder='Enter city name'
						type='search'
						onChange={(e) => onChange(e.target.value)}
					/>
					{isLoading && (
						<div className='position-absolute justify-content-end d-flex w-100 mt-1 mr-1'>
							<Spinner size='xl' color='primary' />
						</div>
					)}
				</div>
				{last5Cities && last5Cities.length >= 1 && (
					<ShowLast5Cities data={last5Cities} />
				)}
			</Col>
			<Col sm='12'>
				{notFound && <Alert color='danger'>City not found</Alert>}
				{weather && !notFound && <WeatherCard data={weather} />}
			</Col>
		</>
	)
}

function ShowLast5Cities({ data = [] }) {
	let content = data.map((item, index) => {
		return (
			<React.Fragment key={index}>
				<Link to={`/${item}`}>{item}</Link>{' '}
			</React.Fragment>
		)
	})
	return (
		<div className='mt-3'>
			last cities you’ve looked
			<br /> {content}
		</div>
	)
}

function WeatherCard({ data = {} }) {
	const { name, country, id, weather, wind = {}, main = {} } = data
	const { humidity, pressure, temp, feels_like } = main

	return (
		<Card key={id} className='mb-3'>
			<CardBody>
				<CardTitle>
					<h3>
						Weather in {name}, {country}
					</h3>
				</CardTitle>

				{weather &&
					weather.map(({ icon, main, description }, index) => (
						<CardText key={index}>
							<img src={icon} alt='' />
							{`${main}, ${description}`}
						</CardText>
					))}
				<Table striped responsive>
					<thead>
						<tr>
							<th>Humidity</th>
							<th>Pressure</th>
							<th>Temperature</th>
							<th>Feels like</th>
							<th>Winds</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope='row'>{humidity}%</th>
							<td>{pressure} hpa</td>
							<td>{temp.toFixed(0)}°C</td>
							<td>{feels_like.toFixed(0)}°C</td>
							<td>{wind.speed} km/h</td>
						</tr>
					</tbody>
				</Table>

				<Link to={`/${name}`}>
					<Button>More details</Button>
				</Link>
			</CardBody>
		</Card>
	)
}
