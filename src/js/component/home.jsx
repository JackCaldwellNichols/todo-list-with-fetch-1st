import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";


//create your first component
const Home = () => {

	//Statehook section
	const [task, setTask] = useState('');
	const [items, setItems] = useState([]);


	//helper funtions
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
		  addTask();
		}
	  };

	function addTask(){

		if(!task){
			alert("You must have something to do!")
		}else{

		const item = {
			id: Math.floor(Math.random()*1000),
			value: task
		}

		setItems(oldList => [...oldList, item]) 
		setTask("");
	}}

	function deleteItems(id) {
		const newArray = items.filter(item => item.id !== id)
		setItems(newArray);
	}
	   return (
			<div className="container">
					
				<h1>ToDo List</h1>
			

				
					<ul>
					<input className = "input" type="text" placeholder="enter your task..." value ={task} onChange={e => setTask(e.target.value)} onKeyDown={handleKeyDown}></input>
					
						{items.map(item => {
							return (
								<li key={item.id}>{item.value}<button className="delete" onClick={() => deleteItems(item.id)}><FontAwesomeIcon icon={faTrashCan}> </FontAwesomeIcon></button></li>					
							)
						})}
					</ul>
				
			</div>

	   )
	};


export default Home;
