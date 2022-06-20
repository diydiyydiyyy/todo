import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Redirect from '../components/redirect';
import Quote from '../components/quote';
import '../../css/dashboard.css';

function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				navigate('/');
			} else {
				setIsValid(true);
			}
		}
		getAllTodos();
	}, []);

	const getAllTodos = async () => {
		setLoading(true);
		const urlApi = 'https://peaceful-citadel-71310.herokuapp.com/todo';
		const config = {
			headers: {
				token: localStorage.getItem('token'),
			},
		};
		try {
			const response = await axios.get(urlApi, config);
			setTodos(response.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const editStatus = async (el) => {
		const urlApi = `https://peaceful-citadel-71310.herokuapp.com/todo/${el.id}`;
		const body = {
			status: el.status ? false : true,
		};
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				token: token,
			},
		};

		try {
			await axios.put(urlApi, body, config);
			return getAllTodos();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (id) => {
		const urlApi = `https://peaceful-citadel-71310.herokuapp.com/todo/${id}`;
		const config = {
			headers: {
				token: localStorage.getItem('token'),
			},
		};
		try {
			await axios.delete(urlApi, config);
			getAllTodos();
		} catch (error) {
			console.log(error);
		}
	};

	if (!isValid) {
		return <Redirect />;
	}

	const dataTodos = [...todos];
	const sortTodos = dataTodos.sort((a, b) => a.status - b.status);

	return (
		<div className="dashboard d-flex justify-content-center">
			<div className="col-7 table-wrapper rounded-5">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<h1>My Todos</h1>
					<Link to="/create-todo">
						<Button>
							<i className="bi bi-plus-lg"></i> New
						</Button>
					</Link>
				</div>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Create at</th>
							<th>Due date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{!sortTodos[0] ? (
							<tr>
								<td colSpan={6} className="text-center py-5">
									{loading ? (
										<Spinner animation="border" variant="primary" />
									) : (
										<>Nothing record to display</>
									)}
								</td>
							</tr>
						) : (
							sortTodos.map((el, i) => (
								<tr key={i}>
									<td>{el.status ? <s>{el.title}</s> : el.title}</td>
									<td>
										{el.status ? <s>{el.description}</s> : el.description}
									</td>
									<td>
										{el.status ? (
											<s>{moment(el.createdAt).format('MMMM, DD YYYY')}</s>
										) : (
											moment(el.createdAt).format('MMMM, DD YYYY')
										)}
									</td>
									<td>
										{' '}
										<td>
											{el.status ? (
												<s>{moment(el.due_date).format('MMMM, DD YYYY')}</s>
											) : (
												moment(el.due_date).format('MMMM, DD YYYY')
											)}
										</td>
									</td>
									<td>
										<div className="d-flex">
											{el.status ? (
												<Button
													disabled
													className="me-1"
													onClick={() => editStatus(el)}>
													<i className="bi bi-check-lg"></i>
												</Button>
											) : (
												<Button className="me-1" onClick={() => editStatus(el)}>
													<i className="bi bi-check-lg"></i>
												</Button>
											)}

											{el.status ? (
												<Button disabled className="me-1">
													<i className="bi bi-pencil-square"></i>
												</Button>
											) : (
												<Link to={`/edit-todo/${el.id}`}>
													<Button className="me-1">
														<i className="bi bi-pencil-square"></i>
													</Button>
												</Link>
											)}

											<Button onClick={() => deleteTodo(el.id)}>
												<i className="bi bi-trash"></i>
											</Button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</div>
			<div className="home-quote">
				<Quote />
			</div>
		</div>
	);
}

export default Dashboard;
