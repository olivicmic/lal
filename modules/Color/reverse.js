module.exports = (value = 0, min = 0, max = 255, range = 255) =>
	Math.round(max - ((max - min) * (((value / range) * max) / max)));