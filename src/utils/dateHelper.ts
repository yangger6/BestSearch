import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ],
})
dayjs.locale('en')

/**
 * format 2015-01 -> Jan 2015
 * @param {string} date - 2015-01
 */
export const date2MonthName = (date: string) => {
    return dayjs(date).format('MMMM YYYY')
}
