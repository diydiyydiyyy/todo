import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Quote from '../components/quote';
import '../../css/home.css';

function Home() {
	const [time, setTime] = useState(moment(new Date()).format('HH:MM'));

	useEffect(() => {
		setInterval(() => {
			setTime(moment(new Date()).format('HH:MM'));
		}, 60000);
	}, []);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center home">
			<h1 className="time">{time}</h1>
			<h2 className="day">{moment().format('dddd, DD MMMM YYYY')}</h2>
			<h1>Welcome to todo app 👋</h1>
			<p>
				<Link to="/login">Click here</Link> to make your new plan!
			</p>
			<div className="home-quote">
				<Quote />
			</div>
		</div>
	);
}

export default Home;
