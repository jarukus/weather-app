import { handleActions } from '@components/utils/redux-actions'
import { CityWeatherModel, DetailsCityWeatherModel } from '@components/models'
const initialState = {
	weather: null,
	isLoading: false,
	detailsWeather: [],
	last5Cities: [],
	notFound: false,
	city: null,
}

import {
	GET_WEATHER_REQUEST,
	GET_WEATHER_SUCCESS,
	GET_WEATHER_ERROR,
	GET_DETAILS_WEATHER_REQUEST,
	GET_DETAILS_WEATHER_SUCCESS,
	GET_DETAILS_WEATHER_ERROR,
} from '@store/constants'

export default handleActions(
	{
		[GET_WEATHER_REQUEST]: (state) => {
			state.isLoading = true
		},
		[GET_WEATHER_SUCCESS]: (state, { resp }) => {
			state.isLoading = false
			if (resp.cod === '404') {
				state.notFound = true
				return
			}
			state.notFound = false
			state.weather = new CityWeatherModel(resp)
			const lastCities = [...new Set([resp.name, ...state.last5Cities])]
			state.last5Cities = lastCities.slice(0, 5)
		},
		[GET_WEATHER_ERROR]: (state) => {
			state.isLoading = false
		},

		[GET_DETAILS_WEATHER_REQUEST]: (state) => {
			state.isLoading = true
		},
		[GET_DETAILS_WEATHER_SUCCESS]: (state, { list = [], city, cod }) => {
			state.isLoading = false
			if (cod === '404') {
				state.notFound = true
				return
			}
			state.detailsWeather = list.map(
				(item) => new DetailsCityWeatherModel(item)
			)
			state.aboutCity = city
		},
		[GET_DETAILS_WEATHER_ERROR]: (state) => {
			state.isLoading = false
		},
	},
	initialState
)
