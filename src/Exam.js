import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Card";
import Row from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Clock from "./Clock";
import RingLoader from "react-spinners/RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faEnvelope,
  faHome,
  faLocationPin,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";
function Exam() {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const url = "https://examinfo.herokuapp.com/";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setExam(data);
      });
  }, []);

  /*   useEffect(() => {
    fetch(
      "https://www.ots.at/api/liste?app=98cff5cb1d921435af7c3ff0d8b25840&query=%28%28HEADER%3D%275+KI%27+OR+HEADER%3D%275+KA%27%29%29&sourcetype=ALL&anz=50"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
      

        setNews(data.ergebnisse);
        console.log(data.ergebnisse);
      });
  }, []); */

  return (
    <div>
      <div className="text-center shopp bg-dark">
        <div className="row">
          <div className="col mt-3 m-2">
            <Clock />
          </div>
          <div
            className="col mt-3 text-center"
            onClick={() => {
              navigate("/");
            }}
          >
            <br />
            <img />
            <FontAwesomeIcon
              icon={faEnvelope}
              color="white"
              style={{ height: "10vw" }}
            />
          </div>
          <div
            className="col"
            onClick={() => {
              navigate("/");
            }}
          >
            <br />
            <FontAwesomeIcon
              icon={faHome}
              color="white"
              style={{ height: "10vw" }}
            />
          </div>
        </div>
      </div>
      <div className="text-white text-center loadingcentered">
        {loading ? (
          <div>
            <RingLoader color="#FFFFFF" />
            <br />
            loading...
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="maincontent">
        {exam.map((item) => {
          return (
            <div className="row mt-3 m-2 lh-1 gap-2 bib">
              <div className="col-5">
                <img src="http://ww2.nycourts.gov/sites/default/files/inline-images/Exam.gif" />
              </div>
              <div className="col lh-1">
                <h1>{item.titel}</h1>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      color="white"
                      size="xs"
                    />
                  </div>
                  <div className="col-10 bib">
                    <p>{item.room}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      color="white"
                      size="xs"
                    />{" "}
                  </div>
                  <div className="col-10 bib">
                    <p>{item.date}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon icon={faClock} color="white" size="xs" />{" "}
                  </div>
                  <div className="col-10 bib">
                    <p>
                      {item.start} <br /> {item.end} <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* return console.log(item.ANHANG); */

  /* 
    <div>
      <button onClick={() => navigate("/")}>Home</button>
    
    </div> */
}
export default Exam;

/* <div key={index}>
<Card className="bg-dark mt-4">
  <h1 className="fs-5">{item.TITEL}</h1>
  {/* {console.log(item.ANHANG.length)} 
</Card>
</div> */
