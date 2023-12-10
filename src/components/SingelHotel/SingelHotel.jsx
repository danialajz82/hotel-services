import React, { useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../../Hooks/useFetch";
import Loder from "../Loder/Loder";
import { useHotels } from "../context/HotelsProvider";

function SingelHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loder />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews}reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingelHotel;
