import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";

function Jobs() {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
export default Jobs;
