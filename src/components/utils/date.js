import { format } from 'date-fns'

export function formatDate(value, date) {
	try {
		if (date) return format(new Date(date), value)
		return format(new Date(), value)
	} catch {}
}
