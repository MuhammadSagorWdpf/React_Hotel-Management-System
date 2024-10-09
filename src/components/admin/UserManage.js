import React from 'react';
import {useState} from 'react';
import './UserTable';
import Header from './Header';
import Sidebar from './Sidebar';
import UserTable from './UserTable';

const UserTables = () =>
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
				<UserTable />
			</div>
		);
}

export default UserTables;