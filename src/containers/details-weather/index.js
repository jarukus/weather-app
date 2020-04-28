import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Spinner,
	ListGroupItem,
	ListGroup,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	Row,
} from 'reactstrap'
import { getDetailsCityWeather } from '@store/actions'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { formatDate } from '@components/utils'

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
]

export default () => {
	const { isLoading, detailsWeather, aboutCity } = useSelector(
		({ isLoading, detailsWeather, aboutCity }) => {
			return { isLoading, detailsWeather, aboutCity }
		}
	)
	const { city } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (city) {
			dispatch(getDetailsCityWeather({ city }))
		}
	}, [city])

	return (
		<>
			<Col sm='12' className='mb-5'>
				<div className='d-flex position-relative'>
					<Link to='/'>Go back</Link>
					{isLoading && (
						<div className='position-absolute justify-content-end d-flex w-100'>
							<Spinner size='xl' color='primary' />
						</div>
					)}
				</div>
			</Col>
			<Col sm='12' className='mb-5'>
				<CityCard city={aboutCity} />
			</Col>
			<Forecast forecast={detailsWeather} />
		</>
	)
}

function CityCard({ city = {} }) {
	const { name, country, population } = city
	return (
		<Card className='mb-3'>
			<CardBody>
				<CardTitle>
					<h3>
						Weather in {name}, {country}
					</h3>
				</CardTitle>
				<CardText>Population: {population}</CardText>
			</CardBody>
		</Card>
	)
}

function Forecast({ forecast }) {
	const currentDay = formatDate('iiii')
	const [activeTab, setActiveTab] = useState(currentDay)

	const toggle = (tab) => activeTab !== tab && setActiveTab(tab)

	const previousDay = days.findIndex((item) => item === currentDay)

	const navTabs = days.map((item, index) => {
		if (previousDay - 1 !== index) {
			return (
				<NavItem key={index}>
					<NavLink
						className={clsx({ active: activeTab === item })}
						onClick={() => toggle(item)}
						style={{ cursor: 'pointer' }}
					>
						{item}
					</NavLink>
				</NavItem>
			)
		}
	})

	const result = forecast.map((item = {}, index) => {
		const { dt_txt, main = {}, weather, wind } = item
		const { humidity, pressure, temp, feels_like } = main
		const day = formatDate('iiii', dt_txt)
		const time = formatDate('hh:mm', dt_txt)

		return (
			<>
				<TabPane tabId={day}>
					<Row>
						<Col sm='12'>
							<ListGroupItem key={index} className='forecastItem'>
								<div className='week-day'>Time: {time}</div>
								<div className='temp'>
									<div>Wind: {wind}</div>
									<div>Humidity: {humidity}</div>
									<div>Pressure: {pressure}</div>
									<div>Temperature: {temp}</div>
									<div>Feels like: {feels_like}</div>
								</div>
								{weather &&
									weather.map(({ icon, main, description }, index) => (
										<CardText key={index}>
											<img src={icon} alt='' />
											{`${main}, ${description}`}
										</CardText>
									))}
							</ListGroupItem>
						</Col>
					</Row>
				</TabPane>
			</>
		)
	})

	return (
		<ListGroup aria-label='forecast data'>
			<Nav tabs>{navTabs}</Nav>
			<TabContent activeTab={activeTab}>{result}</TabContent>
		</ListGroup>
	)
}
