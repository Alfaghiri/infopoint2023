import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser";

import Popup from "reactjs-popup";
import Clock from "./Clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons";
function Events() {
  const [events, setEvents] = useState([]);
  const ref = useRef(null);
  const closePopup = () => ref.current.close();
  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/res")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <div>
      {events.map((item) => {
        return <h1>{item}</h1>;
      })}
    </div>
  );
}
export default Events;
