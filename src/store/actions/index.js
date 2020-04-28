import {
	GET_WEATHER_REQUEST,
	GET_WEATHER_SUCCESS,
	GET_WEATHER_ERROR,
	GET_DETAILS_WEATHER_REQUEST,
	GET_DETAILS_WEATHER_SUCCESS,
	GET_DETAILS_WEATHER_ERROR,
} from '@store/constants'
import { ApiClient } from '@components/utils/api'

const api = new ApiClient()

export const getCityWeather = ({ city, units = 'metric' }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_WEATHER_REQUEST })
			const resp = await api.get(`/weather?q=${city}&units=${units}`)
			dispatch({ type: GET_WEATHER_SUCCESS, resp })
		} catch (error) {
			dispatch({ type: GET_WEATHER_ERROR })
		}
	}
}

export const getDetailsCityWeather = ({ city, units = 'metric' }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_DETAILS_WEATHER_REQUEST })
			const resp = await api.get(`/forecast/?q=${city}&units=${units}`)
			dispatch({ type: GET_DETAILS_WEATHER_SUCCESS, ...resp })
		} catch (error) {
			dispatch({ type: GET_DETAILS_WEATHER_ERROR })
		}
	}
}
