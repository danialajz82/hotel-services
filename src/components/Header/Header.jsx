import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import React, { useRef, useState } from "react";
import UseOutsideClick from "../../Hooks/UseOutsideClick";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    Adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const navigate = useNavigate();

  const handelOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation == "inc" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  const handelSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      option: JSON.stringify(option),
    });
    setSearchParams(encodedParams);
    navigate({
      pathname: "./hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM,dd,yyyy")} TO  ${format(
              date[0].endDate,
              "MM,dd,yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option.Adult}. Adult | {option.children}. Children | {option.room}
            .Room
          </div>
          {openOption && (
            <GuestOptionList
              setOpenOption={setOpenOption}
              handelOption={handelOption}
              option={option}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handelSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ option, handelOption, setOpenOption }) {
  const optionRef = useRef();
  UseOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handelOption={handelOption}
        type="Adult"
        option={option}
        minLimit={1}
      />
      <OptionItem
        handelOption={handelOption}
        type="children"
        option={option}
        minLimit={1}
      />
      <OptionItem
        handelOption={handelOption}
        type="room"
        option={option}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ option, type, minLimit, handelOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handelOption(type, "dec")}
          className="optionCounterBtn"
          disabled={option[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          onClick={() => handelOption(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
