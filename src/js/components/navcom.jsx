import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Modal, Button } from 'react-bootstrap';

function NavCom() {
	// Modal
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const navigate = useNavigate();
	const doLogout = () => {
		localStorage.clear();
		navigate('/');
		setShowModal(!showModal);
	};

	function returnNavbar() {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('token')) {
				return <></>;
			} else if (localStorage.getItem('token')) {
				return (
					<>
						<Navbar>
							<Container>
								<Link to="/dashboard">
									<Navbar.Brand>Todo App</Navbar.Brand>
								</Link>
								<Navbar.Toggle />
								<Navbar.Collapse className="justify-content-end">
									<Button onClick={handleShowModal}>
										Logout <i className="bi bi-box-arrow-right"></i>
									</Button>
								</Navbar.Collapse>
							</Container>
						</Navbar>

						<Modal show={showModal} onHide={handleCloseModal}>
							<Modal.Header closeButton></Modal.Header>
							<Modal.Body>Are you sure want to logout?</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={handleCloseModal}>
									Close
								</Button>
								<Button variant="primary" onClick={doLogout}>
									Logout
								</Button>
							</Modal.Footer>
						</Modal>
					</>
				);
			}
		}
	}
	return <>{returnNavbar()}</>;
}

export default NavCom;
