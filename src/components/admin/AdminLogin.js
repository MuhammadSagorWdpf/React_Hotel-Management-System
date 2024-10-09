import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AdminLogin()
{

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	//Code for preventing acc to admin login page directly.

	useEffect(()=>{

		//If the user already logged In, redirect to the dashboard

		if(localStorage.getItem('adminToken'))
		{
			navigate('/dashboard');	
		}
	},[navigate]);

	const handleSubmit = async (e) =>
	{
		e.preventDefault();

		try
		{
			const response = await axios.post("http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/admin_login.php",{email, password,});

			if(response.data.success)
			{
				//Store the token in localStorage
				localStorage.setItem('adminToken', response.data.token);
				navigate('/dashboard');

			}
			else
			{
				setError(response.data.message);
			}
		}

		catch(error)
		{
			setError('An error occured. Please Try Again.');
		}
	};
	
	return(
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title text-center">Admin Login</h3>
								{error && <div className="alert alert-danger">{error}</div>}

								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label>Email:</label>
										<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
									</div>

									<div className="mb-3">
										<label>Password:</label>
										<input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
									</div>
									<button type="submit" className="btn btn-primary" w-100>Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default AdminLogin;