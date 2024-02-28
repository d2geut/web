const quotes = [
	{
		quote: "111111",
		author: "hanryu"
	},
	{
		quote: "222222",
		author: "hanryu2"
	},
	{
		quote: "33333333",
		author: "hanryu3"
	},
	{
		quote: "4444444",
		author: "hanryu4"
	},
	{
		quote: "555555",
		author: "hanryu5"
	},
	{
		quote: "666666",
		author: "hanryu6"
	},
	{
		quote: "777777",
		author: "hanryu7"
	},
	{
		quote: "188888",
		author: "hanryu8"
	},
	{
		quote: "19999999",
		author: "hanryu9"
	},
	{
		quote: "0000000",
		author: "hanryu0"
	},
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;