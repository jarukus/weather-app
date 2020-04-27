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
		this.main = data.main
		this.wind = data.wind
	}
}
