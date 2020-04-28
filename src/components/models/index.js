import { _ICON_URL } from '@/config'

export class CityWeatherModel {
	constructor(data = {}) {
		this.id = data.id
		this.name = data.name
		this.country = data.sys.country
		this.clouds = data.clouds.all
		this.weather = data.weather.map(({ icon, description, main }) => {
			const fullIcon = `${_ICON_URL}/${icon}.png`
			return { icon: fullIcon, description, main }
		})
		this.main = {
			feels_like: data.main.feels_like.toFixed(0) + '°C',
			humidity: data.main.humidity + '%',
			pressure: data.main.pressure + ' hpa',
			temp: data.main.temp.toFixed(0) + '°C',
		}
		this.wind = data.wind.speed + ' km/h'
	}
}

export class DetailsCityWeatherModel {
	constructor(data = {}) {
		this.dt_txt = data.dt_txt
		this.clouds = data.clouds.all
		this.weather =
			data.weather &&
			data.weather.map(({ icon, description, main }) => {
				const fullIcon = `${_ICON_URL}/${icon}.png`
				return { icon: fullIcon, description, main }
			})
		this.main = {
			feels_like: data.main.feels_like.toFixed(0) + '°C',
			humidity: data.main.humidity + '%',
			pressure: data.main.pressure + ' hpa',
			temp: data.main.temp.toFixed(0) + '°C',
		}
		this.wind = data.wind.speed + ' km/h'
	}
}
