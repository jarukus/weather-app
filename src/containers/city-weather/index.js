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

	const onChange = debounceDecorator((payload) => {
		const city = typeof payload === 'string' ? payload.trim() : ''
		city.length > 2 && getData(city)
	}, 500)

	const getData = (data) => dispatch(getCityWeather({ city: data }))

	return (
		<>
			<Col sm='12' className='mb-5'>
				<h1>Weather App</h1>
			</Col>
			<Col sm='12' className='mb-5 position-relative'>
				<div className='d-flex justify-content-between'>
					<h4 className='mb-3'>Enter city name</h4>
					{isLoading && <Spinner size='xl' color='primary' />}
				</div>
				<Input
					placeholder='City'
					type='search'
					onChange={(e) => onChange(e.target.value)}
				/>
				{last5Cities && last5Cities.length >= 2 && (
					<ShowLast5Cities onChange={getData} data={last5Cities} />
				)}
			</Col>
			<Col sm='12'>
				{notFound && <Alert color='danger'>City not found</Alert>}
				{weather && !notFound && <WeatherCard data={weather} />}
			</Col>
		</>
	)
}

function ShowLast5Cities({ data = [], onChange }) {
	let content = data.map((item, index) => {
		return (
			<React.Fragment key={index}>
				<Button color='link' onClick={() => onChange(item, 0)}>
					{item}
				</Button>{' '}
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
							<td>{humidity}</td>
							<td>{pressure}</td>
							<td>{temp}</td>
							<td>{feels_like}</td>
							<td>{wind}</td>
						</tr>
					</tbody>
				</Table>

				<Link to={name}>
					<Button>More details</Button>
				</Link>
			</CardBody>
		</Card>
	)
}
