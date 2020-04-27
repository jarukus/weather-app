import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Button,
	Input,
	Col,
	Card,
	CardBody,
	CardImg,
	CardTitle,
	CardText,
	Spinner,
} from 'reactstrap'
import { getDetailsCityWeather } from '@store/actions'
import { useParams } from 'react-router-dom'

export default () => {
	const { isLoading, detailsWeather } = useSelector(
		({ isLoading, detailsWeather }) => {
			return { isLoading, detailsWeather }
		}
	)
	const { city } = useParams()
	const dispatch = useDispatch()
	console.log('location', detailsWeather)

	useEffect(() => {
		if (city) {
			dispatch(getDetailsCityWeather({ city }))
		}
	}, [city])

	const [] = detailsWeather

	return (
		<>
			<Col sm='12' className='mb-5'>
				<Link to='/'>Go back home</Link>
				<div className='d-flex position-relative'>
					{isLoading && (
						<div className='position-absolute justify-content-center d-flex w-100'>
							<Spinner size='xl' color='primary' />
						</div>
					)}
				</div>
			</Col>
			<Col sm='12'>
				<Card>
					<CardImg
						top
						width='100%'
						src='/assets/318x180.svg'
						alt='Card image cap'
					/>
					<CardBody>
						<CardTitle>Card title</CardTitle>
						<CardText>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</CardText>
						<Button>Read more</Button>
					</CardBody>
				</Card>
			</Col>
		</>
	)
}

function WeatherCard(data) {}
