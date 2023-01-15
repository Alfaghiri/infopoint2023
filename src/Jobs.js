import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Clock from "./Clock";
import RingLoader from "react-spinners/RingLoader";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faHome,
  faHouseLaptop,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
function Jobs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const ref = useRef(null);
  const closePopup = () => ref.current.close();
  let navigate = useNavigate();
  /*  const url = "http://localhost:5000/job"; */
  const url = "https://infojobs.herokuapp.com";
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setJobs(data);
      });
  }, []);

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
              icon={faHouseLaptop}
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
        {jobs.map((item, index) => {
          return (
            <div>
              <Popup
                ref={ref}
                trigger={
                  <div className="row mt-3 m-2 lh-1 gap-2 jobs text-white">
                    <div className="col-5">{<img src={item.image} />}</div>
                    <div className="col lh-1">
                      <h1>{item.title}</h1>
                      <br />
                      <h2 className="jobs">{item.des}</h2>
                      <div className="row"></div>
                    </div>
                  </div>
                }
                position="top center"
                className="salecard"
                arrow={false}
                modal
                closeOnDocumentClick={false}
              >
                <div className="text-center text-white">
                  <div className="col">
                    {" "}
                    <h1>{item.title}</h1>
                  </div>
                  <QRCode value={item.link} />
                  <div className="col">
                    <p>{item.des}</p>
                  </div>
                </div>
                <button
                  className="close bg-indicatorbackground"
                  onClick={closePopup}
                >
                  X
                </button>
              </Popup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Jobs;
