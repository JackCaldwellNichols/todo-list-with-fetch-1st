import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect } from "react";


//create your first component
const Home = () => {

	//Statehook section
	const [task, setTask] = useState('');
	const [items, setItems] = useState([]);

	const getList = (items) => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/jack1987", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));		
	};

	const updateList = () => {

		var requestOptions = {
			method: 'PUT',
			body: JSON.stringify(items),
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/jack1987", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
		}

	useEffect(() => {
		getList(items);
	}, []);


	useEffect(() => {
		updateList();
	},[addTask]); 


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
								<li>{items.length + " items left"}</li>
					</ul>
			</div>
	   )
	};

export default Home;
