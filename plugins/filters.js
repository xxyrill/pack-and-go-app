import moment from 'moment'
import Vue from 'vue'

Vue.filter('monthdayyear', date => moment(date).local().format('MMMM D, YYYY'))

Vue.filter('monthdayyearwithtime', date => moment(date).local().format('MMMM D, YYYY h:mm a'))

Vue.filter('monthyear', date => moment(date).local().format('D MMMM YYYY'))

Vue.filter('monthday', date => moment(date).local().format('MMM Do'))

Vue.filter('datetime', date => moment(date).local().format('MMMM D, YYYY HH:mm A'))

Vue.filter('time', date => moment(date).local().format('h:mm A'))

Vue.filter('comma', number => Number.parseFloat(number).toFixed(0).split('.')[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))

Vue.filter('capitalfirst', string => _.startCase(_.lowerCase(string)))

Vue.filter('capitalall', string => _.upperCase(string))

Vue.filter('decimalcomma', number => number ? Number.parseFloat(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null)

Vue.filter('commaarray', string => [...new Set(string)].join(', '))

Vue.filter('dotdot', string => (string.length <= 20) ? string : string.slice(0, 20)+'...')

Vue.filter('dateToWord', string => moment(string).format('MMMM D, YYYY'))