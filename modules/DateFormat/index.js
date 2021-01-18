module.exports = (input) =>{
	const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		padNum = (num,add) => (num+add < 10) ? '0' + (num+add) : `${num+add}`;

	let max = (!input || !input.truncate),
		date = (!input || !input.date) ? new Date() : input.date,
		day = max ? date.getDate() : padNum(date.getDate(),0),
		mm = date.getMonth(),
		year = date.getFullYear(),
		hour = date.getHours(),
		eve = hour > 11,
		hr = eve ? padNum(hour - 11,0) : padNum(hour, 1),
		min = padNum(date.getMinutes(),0),
		div = max ? '_' : '',
		clock = `${hr}${max ? '.' : ''}${min}${div}${eve ? 'PM' : 'AM'}`,
		month = max ? monthArr[mm] : padNum(mm,1);

	return month + div + day + div + year + div + clock;
};