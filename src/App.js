import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("NameAZ");
  const apiCall = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    apiCall();
  }, []);
  if (!loading) {
    return (
      <div className="app">
        <h1>JSON Placeholder Data</h1>
        <div>
          <label>Sort by</label>{" "}
          <select onChange={(e) => setSelectedSort(e.target.value)}>
            <option value="NameAZ">Name: A - Z</option>
            <option value="NameZA">Name: Z - A</option>
            <option value="CompanyAZ">Company: A - Z</option>
            <option value="CompanyZA">Company: Z - A</option>
          </select>
          {selectedSort === "NameAZ" &&
            data
              .sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((user) => <Details key={user.id} user={user} />)}
          {selectedSort === "NameZA" &&
            data
              .sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
              })
              .map((user) => <Details key={user.id} user={user} />)}
          {selectedSort === "CompanyAZ" &&
            data
              .sort(function (a, b) {
                if (a.company.name < b.company.name) {
                  return -1;
                }
                if (a.company.name > b.company.name) {
                  return 1;
                }
                return 0;
              })
              .map((user) => <Details key={user.id} user={user} />)}
          {selectedSort === "CompanyZA" &&
            data
              .sort(function (a, b) {
                if (a.company.name < b.company.name) {
                  return 1;
                }
                if (a.company.name > b.company.name) {
                  return -1;
                }
                return 0;
              })
              .map((user) => <Details key={user.id} user={user} />)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>loading</h1>
      </div>
    );
  }
};

const Details = (user) => {
  return (
    <div className="details">
      <h2>{user.user.name}</h2>
      <ul>
        <li>{user.user.phone}</li>
        <li>{user.user.email}</li>
        <li>{user.user.website}</li>
      </ul>
      <div className="address">
        Address -
        <p>
          {user.user.address.suite}, {user.user.address.street},{" "}
          {user.user.address.city},{user.user.address.zipcode}
        </p>
      </div>

      <div className="company">
        <h2>{user.user.company.name}</h2>
        <h3>{user.user.company.catchPhrase}</h3>
        <h3>{user.user.company.bs}</h3>
      </div>
    </div>
  );
};

export default App;
