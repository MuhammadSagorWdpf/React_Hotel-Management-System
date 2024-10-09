import React from 'react';
import {useState} from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import RoomForm from './RoomeForm';
import'./roomform.css';

const BackendData = () =>
{
const [openSidebarToggle, setOpenSidebarToggole] = useState(false);

const openSidebar = () =>
{
	setOpenSidebarToggole(!openSidebarToggle)
}


	return(

			<div className="grid-container mybody">
				<Header openSidebar = {openSidebar} />
				<Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>
				<RoomForm />
			</div>
		);
}

export default BackendData;