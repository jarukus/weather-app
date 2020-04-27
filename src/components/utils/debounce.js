export function debounceDecorator(fn, delay = 300) {
	let timerId
	return function (...args) {
		if (timerId) {
			clearTimeout(timerId)
		}
		timerId = setTimeout(() => {
			fn.call(this, ...args)
			timerId = null
		}, delay)
	}
}
