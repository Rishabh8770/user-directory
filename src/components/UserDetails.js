import React, { useState, useEffect } from "react";
import UsersPosts from './UsersPostsCards'
import Stopwatch from './Stopwatch'

const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const [continentData, setContinentData] = useState([]);
  const [stopwatchRunning, setStopwatchRunning] = useState(true);

  const handleBack = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const userId = window.location.pathname.split("/")[2];

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((user) => setUserData(user))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        const continentMap = new Map();

        data.forEach((timezone) => {
          const [continent, country] = timezone.split("/");

          if (!continentMap.has(continent)) {
            continentMap.set(continent, [country]);
          } else {
            continentMap.get(continent).push(country);
          }
        });

        const continents = [];
        continentMap.forEach((countries, continent) => {
          continents.push({ continent, countries });
        });

        setContinentData(continents);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="container">
      <h5 className="text-center my-3">User Details</h5>
      <div className="d-flex flex-column details-section mb-4" style={{ border: "1px solid black", borderRadius: "5px" }}>
        <div className="d-flex justify-content-between">
          <button className="btn-back btn-primary m-2" onClick={handleBack}>
            Back
          </button>
          <select className="m-2">
            <option value="">Select Country</option>
            {continentData.map(({ continent, countries }, index) => (
              <React.Fragment key={index}>
                <option disabled>{continent}</option>
                {countries.map((country, countryIndex) => (
                  <option key={countryIndex} value={country}>
                    {country}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>
          <Stopwatch running={stopwatchRunning} />
        </div>

        <div className="d-flex justify-content-between profile-section p-3 mx-3 my-5" style={{ border: "1px solid black", borderRadius: "15px" }}>
          <div>
            <p>{userData.name}</p>
            <p>{userData.username} | {userData.company && userData.company.catchPhrase}</p>
          </div>
          <div>
            <p>{userData.address && userData.address.city}</p>
            <p>{userData.email} | {userData.phone}</p>
          </div>
        </div>
        <UsersPosts userId={userData.id}/>
      </div>
    </div>
  );
};

export default UserDetails;
