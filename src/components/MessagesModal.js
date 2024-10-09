import React, {useState, useEffect} from 'react';
import {Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function MessagesModal({show, handleClose})
{
	const [messages, setMessage] = useState([]);
	const [replyVisibility, setReplyVisibility] = useState({});

	useEffect(()=>
	{
		if(show)
		{
			fetchMessages();
		}
	},[show]);

	const fetchMessages = async () =>
	{
		try
		{
			const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/getMessages.php');
			setMessage(response.data);
		}

		catch(error)
		{
			console.error("error fetching data:", error);
		}
	};

	const toggleReply = (id) =>
	{
		setReplyVisibility((prevState)=> ({

			...prevState, [id]: !prevState[id],

		}));
	};

	const handleSendReply = async (id) =>
	{
		const replyText = replyVisibility[id];
		if(replyText)
		{
			try
			{
				await axios.post('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/sendReply.php',{

					id,
					replyText,
				});
			

			//Mark message as read after sending reply
				await handleMarkAsRead(id);
			//Update the frontend to see the change

			setMessage((prevState)=>
				prevState.map((message)=>
					message.id===id?{...message, status: 'read'} : message));

			//Clear the reply text and hide the textarea after sending...

			setReplyVisibility((prevState)=>({

				...prevState,
				[id]: '',
			}));

			}

			catch(error)
			{
				console.error("Error sending reply:", error);
			}
		}
	}; 

	const handleMarkAsRead = async (id) =>
	{
		try
		{
			const response = await axios.post('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/markAsRead.php', JSON.stringify({id: id}),
					{headers: {'Content-Type':'application/json',},});

			if(response.data.success)
			{
				setMessage((prevState)=>
				prevState.map((message)=>
					message.id===id?{...message, status: 'read'} : message));
			}

			else
			{
				console.error("Error", response.data.message);
			}
		}
		
		catch(error)
		{
			console.error("Error Occured:", error);
		}

	};

	return(
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Feedbacks</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{messages.length > 0 ? (
							<ul className="list-group">
								{messages.map((message) => (

										<li key={message.id} className="list-group-item">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<b>{message.name}</b>({message.email})
											<p>{message.message}</p>
											{message.status == 'unread' && (
													<Button variant="success" className="me-2" onClick={()=>handleMarkAsRead(message.id)}>Mark as read
													</Button>
												)}
											</div>
									  <div>									
										<Button variant="primary" className="ms-2" onClick={() => toggleReply(message.id)}>Reply</Button>
									   </div>
									</div>
										{replyVisibility[message.id] && (
											<div className="mt-3">
											<Form.Group controlId={`replyText-${message.id}`}>

											<Form.Control as="textarea" rows={3}placeholder="Write Your Reply Here..." value={replyVisibility[message.id] || ''} onChange={(e)=>setReplyVisibility((prevState)=>({
													...prevState, [message.id]: e.target.value,
												})) }

												/>
												</Form.Group>

												<Button variant="primary" className="mt-2" onClick={()=>handleSendReply(message.id)}>Send</Button>
											</div>
									)}
									</li>
									))}
							</ul>
						): (

							<p>No message found.</p>
						)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close
					</Button>
				</Modal.Footer>
			</Modal>
		);	
}

export default MessagesModal;