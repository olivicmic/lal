const uno = require('../uno');

module.exports = (input) =>{
	const {
		date: objDate,
		mono,
		truncate: trim
	} = uno(input);
	const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const padNum = (num,add) => (num+add < 10) ? '0' + (num+add) : `${num+add}`;
	let date = mono || objDate || null;
	if (!(date instanceof Date)) date = new Date(date);
	let day = trim ? padNum(date.getDate(),0) : date.getDate();
	let mm = date.getMonth();
	let year = date.getFullYear();
	let hour = date.getHours();
	let eve = hour > 11;

	hour = hour % 12;
	hour = padNum(hour ? hour : 12,0);

	let min = padNum(date.getMinutes(),0);
	let div = trim ? '' : '_';
	let clock = `${hour}${trim ? '' : '.'}${min}${div}${eve ? 'PM' : 'AM'}`;
	let month = trim ? padNum(mm,1) : monthArr[mm];

	return month + div + day + div + year + div + clock;
};