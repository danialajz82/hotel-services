import React from "react";
import useFetch from "../../Hooks/useFetch";

function LocationList() {
  const { data, isLoding } = useFetch("http://localhost:5000/hotels", "");
  if (isLoding) <p>Loding...</p>;
  return (
    <div className="nearbyLocation">
      <h2>nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
