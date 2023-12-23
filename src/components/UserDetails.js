import React, {useState, useEffect} from "react";

export default function UserDetails() {

  const [continentData, setContinentData] = useState([]);

  const handleBack = () => {
    window.location.href = "/"
  }
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then(response => response.json())
      .then(data => {
        const continentMap = new Map();

        data.forEach(timezone => {
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
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="container" >
    
      <h5 className="text-center my-3">User Details</h5>
      <div className="d-flex flex-column details-section" style={{border: "1px solid black", borderRadius: "5px"}}>
      <div className="d-flex justify-content-between">
        <button className="btn-back btn-primary m-2" onClick={handleBack}>Back</button>
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
        <div className="m-2">timer</div>
        <button className="start-pause btn-success m-2">Pause/Start</button>
      </div>
    
    <div className="d-flex justify-content-between profile-section p-3 mx-3 my-5" style={{border: "1px solid black", borderRadius: "15px"}}>
      <div>
        <p>Name</p>
        <p>Username | Catch Phrase</p>
      </div>
      <div>
        <p>Address</p>
        <p>Email | Phone</p>
      </div>
    </div>
    </div>
    </div>
  );
}
