import React, { useState } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";
function App() {
	// URL in a variable
	const url = "https://dog-backend-329.herokuapp.com";
	// State to hold the list of dogs
	const [dogs, setDogs] = React.useState([]);
	// Empty dog - for the create form
	const emptyDog = {
		name: "",
		age: "",
		img: "",
	};
	//
	const [selectedDog, setSelectedDog] = useState(emptyDog);

	// Function to handle Create
	const handleCreate = (newDog) => {
		fetch(url + "/dog/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDog),
		}).then(() => getDogs());
	};
	// Handle when the edit form is submitted
	const handleUpdate = (dog) => {
		fetch(url + "/dog/" + dog._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dog),
		}).then(() => getDogs());
	};
	// function to specify which dog we are updating
	const selectDog = (dog) => {
		setSelectedDog(dog);
	};

   // deleteDog to delete inidividual dogs
   const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      getDogs()
    })
  }
	// Function to get list of Dogs
	const getDogs = () => {
		// make a get a request to this url
		fetch(url + "/dog/")
			// use .then to take action when the response comes in
			// convert data into js object
			.then((response) => response.json())
			// use the data from the response
			.then((data) => {
				setDogs(data);
			});
	};
	// useEffect, to get the data right away
	React.useEffect(() => {
		getDogs();
	}, []);
	return (
		<div className="App">
			<h1>DOG LISTING SITE</h1>
			<hr />
			<Link to="/create">
				<button>Add dog</button>
			</Link>
			<main>
				<Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              dogs={dogs} 
              selectDog={selectDog}
              deleteDog={deleteDog} 
              />
            )}
          />
					<Route
						exact
						path="/create"
						render={(rp) => (
							<Form
								{...rp}
								label="create"
								dog={emptyDog}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path="/edit"
						render={(rp) => (
							<Form
								{...rp}
								label="update"
								dog={selectedDog}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}
export default App;
