import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import Redirect from '../components/redirect';
import '../../css/create-edit.css';

function Edit() {
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState('');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [due_date, setDue_date] = useState('');

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				navigate('/');
			} else {
				setIsValid(true);
			}
		}
		getTodoById();
	}, []);

	const getTodoById = async () => {
		const urlApi = `https://peaceful-citadel-71310.herokuapp.com/todo/${id}`;
		const body = {
			headers: {
				token: localStorage.getItem('token'),
			},
		};

		const response = await axios.get(urlApi, body);
		setTitle(response.data.data.title);
		setDescription(response.data.data.description);
		setDue_date(response.data.data.logo);
	};

	const editTodo = async (e) => {
		setLoading(true);
		e.preventDefault();
		const urlApi = `https://peaceful-citadel-71310.herokuapp.com/todo/${id}`;
		const body = {
			title,
			description,
			due_date,
		};
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				token: token,
			},
		};

		try {
			await axios.put(urlApi, body, config);
			navigate('/dashboard');
		} catch (error) {
			if (error) {
				setMsg(error.response.data.message);
			}
		} finally {
			setLoading(false);
			setTimeout(() => {
				setMsg('');
			}, 5000);
		}
	};

	if (!isValid) {
		return <Redirect />;
	}

	return (
		<div className="d-flex justify-content-center mt-5">
			<div className="col-5 create-edit rounded-5">
				<form onSubmit={editTodo}>
					<h2 className="text-center">Edit {title}</h2>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="due">
						<Form.Label>Due Date</Form.Label>
						<Form.Control
							type="date"
							min={new Date().toISOString().split('T')[0]}
							value={moment(due_date).format('YYYY-MM-DD')}
							onChange={(e) => setDue_date(e.target.value)}
						/>
					</Form.Group>

					{msg ? (
						<p className="mb-4 text-center" style={{ color: 'red' }}>
							!! {msg}
						</p>
					) : (
						<></>
					)}

					<div className="d-flex justify-content-center">
						<Link to="/dashboard">
							<Button className="mx-2">Cancel</Button>
						</Link>
						<Button type="submit" className="mx-2">
							{loading ? (
								<Spinner animation="border" variant="light" size="sm" />
							) : (
								<> Edit </>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Edit;
