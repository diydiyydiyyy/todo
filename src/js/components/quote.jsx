import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/quote.css';

function Quote() {
	const [quote, setQuote] = useState({
		content: 'The best way to predict the future is to create it.',
		author: 'Abraham Lincoln',
	});

	const getQuotes = async () => {
		const urlApi = 'https://api.quotable.io/random';
		try {
			const response = await axios.get(urlApi);
			setQuote(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setInterval(() => {
			getQuotes();
		}, 10000);
	}, []);

	return (
		<div className="quote">
			<blockquote className="fst-italic text-center">
				{quote.content}
			</blockquote>
			<p>
				<span>― </span>
				{quote.author}
				<span> ―</span>
			</p>
			<hr />
		</div>
	);
}

export default Quote;
