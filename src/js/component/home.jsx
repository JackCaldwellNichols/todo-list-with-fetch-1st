import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect } from "react";


//create your first component
const Home = () => {

	//Statehook section
	const [task, setTask] = useState('');
	const [items, setItems] = useState([]);


		 const getList = () => {
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/jack1987")
		  	.then(response => {
				if(response.ok) {console.log("Success")}
			})
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));		
		} 

		const updateList = () => {	
		fetch('https://assets.breatheco.de/apis/fake/todos/user/jack1987', {
      method: "PUT",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
       // return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        console.log(error);
    });
}

const deleteList = () => {	
	fetch('https://assets.breatheco.de/apis/fake/todos/user/jack1987', {
  method: "DELETE",
 
})
.then(resp => {
	setItems([]);
	return resp.json(); 
})

.catch(error => {
	//error handling
	console.log(error);
});
}

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
			label: task, done: false
		}
		setItems(oldList => [...oldList, item]) 
		setTask("");
	}}

	function deleteItems(id) {
		const newArray = items.filter(item => item.id !== id)
		setItems(newArray);
	}

	useEffect(()=>{
		getList(setItems);
	},[])
	
	useEffect(()=>{
		updateList(items)
	},[items])

	   return (
			<div className="container">					
				<h1>ToDo List</h1>
					<ul>
					<input className = "input" type="text" placeholder="enter your task..." value ={task} onChange={e => setTask(e.target.value)} onKeyDown={handleKeyDown}></input>
						{items.map(item => {
							return (
								<li key={item.id}>{item.label}<button className="delete" onClick={() => deleteItems(item.id)}><FontAwesomeIcon icon={faTrashCan}> </FontAwesomeIcon></button></li>		
							)
						})}
								<li>You have  {items.length } item(s) left</li>
								<li className="list-group-item text-center">
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => {
											deleteList();
										}}>
										Remove user
									</button>
								</li>
					</ul>
			</div>
	   )
	};

export default Home;

