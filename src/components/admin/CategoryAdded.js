import React from 'react';
import {useState} from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import AddCategory from './AddCategory';
import './AddCategory.css';

const Categories = () =>
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
				<AddCategory />
			</div>
		);
}

export default Categories;