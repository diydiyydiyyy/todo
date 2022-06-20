import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FloatingLabel, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../../css/login-register.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const doLogin = (e) => {
		e.preventDefault();
		setLoading(true);
		const urlApi = 'https://peaceful-citadel-71310.herokuapp.com/signin';
		const body = {
			email,
			password,
		};

		axios
			.post(urlApi, body)
			.then((response) => {
				if ({ response }) {
					localStorage.setItem('token', response.data.token);
					navigate('/dashboard');
				}
			})
			.catch((error) => {
				if (error) {
					setMsg(error.response.data.message);
				}
			})
			.finally(() => {
				setLoading(false);
				setEmail('');
				setPassword('');

				setTimeout(() => {
					setMsg('');
				}, 5000);
			});
	};

	function returnLogin() {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				return (
					<form className="form-login-register col-4" onSubmit={doLogin}>
						<Link to="/">
							<i className="bi bi-x close-btn"></i>
						</Link>
						<h1 className="text-center mb-5">Login Todo App</h1>
						<FloatingLabel
							controlId="floatingInput"
							label="Email address"
							className="mb-3">
							<Form.Control
								type="email"
								placeholder="name@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingPassword"
							label="Password"
							className="mb-4">
							<Form.Control
								type="password"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FloatingLabel>

						{msg ? (
							<p className="mb-4 text-center" style={{ color: 'red' }}>
								!! {msg}
							</p>
						) : (
							<></>
						)}

						<div className="d-flex justify-content-center mb-2">
							<Button type="submit" className="col-12">
								{loading ? (
									<Spinner animation="border" variant="light" size="sm" />
								) : (
									<> Submit </>
								)}
							</Button>
						</div>
						<p>
							Don't have an account? <Link to="/register">register here</Link>
						</p>
					</form>
				);
			} else if (localStorage.getItem('token')) {
				return (
					<form className="form-login-register col-4 d-flex flex-column justify-content-center align-items-center">
						<h1 className="mb-4">You are logged in!</h1>
						<div>
							<Link to="/dashboard">
								<Button type="submit" variant="primary">
									Return to dashboard
								</Button>
							</Link>
						</div>
					</form>
				);
			}
		}
	}

	return (
		<div className="d-flex justify-content-center align-items-center login-register">
			{returnLogin()}
		</div>
	);
}

export default Login;
