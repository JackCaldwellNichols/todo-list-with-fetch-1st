import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect } from "react";


//create your first component
const Home = () => {

	//Statehook section
	const [task, setTask] = useState('');
	const [items, setItems] = useState([]);


		const getList = async () => {
		   const res = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jack1987")
		   const data = await res.json()
			console.log("&&&&", data)
			setItems(data)
		} 

		const updateList = async () => {
		try {
			const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/jack1987', {
				method: "PUT",
				body: JSON.stringify(items),
				headers: {
					"Content-Type": "application/json"
				}
				})
				const data = (response => {
				console.log("RESPONSE",response.status); // the status code = 200 or code = 400 etc.
				
				setItems(data) // will try return the exact result as string
       // return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
	}catch(error){
        console.log(error);
    	};
	}

const deleteList = () => {	
	fetch('https://assets.breatheco.de/apis/fake/todos/user/jack1987', {
  method: "PUT",
 
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

const removeUser = () => {	
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
		if(newArray.length >= 1){
			setItems(newArray)
		}else{
			setItems([])
			console.log(items)
		}
		
	}

	useEffect(()=>{
		getList()
	},[])
	
	useEffect(()=>{
		updateList(items)
	},[items])

	   return (
			<div className="container">					
				<h1>ToDo List</h1>
					<ul>
					<input className = "input" type="text" placeholder="enter your task..." value ={task} onChange={e => setTask(e.target.value)} onKeyDown={handleKeyDown}></input>
						{items.map((item) => {
							return (
								<li key={item.id}>{item.label}<button className="delete" onClick={() => deleteItems(item.id)}><FontAwesomeIcon icon={faTrashCan}> </FontAwesomeIcon></button></li>		
							)
						})}
								<li>You have {items?.length} item(s) left</li>
								<li className="list-group-item text-center">
									<button
										className="btn btn-outline-warning btn-sm"
										onClick={() => {
											deleteList();
										}}>
										Clear list
									</button>
									<button
										className="btn btn-outline-danger btn-sm ms-3"
										onClick={()  => {
											removeUser();
										}}>
										Remove User
									</button>
								</li>
					</ul>
			</div>
	   )
	};

export default Home;

