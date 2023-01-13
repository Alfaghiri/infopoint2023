import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Card";
import Raw from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Clock from "./Clock";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faDirections,
  faEnvelope,
  faFire,
  faHome,
  faL,
  faLocationDot,
  faLocationPin,
  faMailBulk,
  faMapLocationDot,
  faPhone,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
function Unimap() {
  let navigate = useNavigate();
  const [unimap, setUnimap] = useState([]);
  const ref = useRef(null);
  const ref1 = useRef(null);

  const url =
    "https://raw.githubusercontent.com/Alfaghiri/infopoint/master/map_eg.json";
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUnimap(data);
      });
  }, []);

  return (
    <div>
      <div className="text-white bg-dark shopp">
        <div className="text-center">
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
                icon={faShop}
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
      </div>

      <div className="text-white maincontent">
        <svg
          id="Door"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-100 200 2500 3600"
        >
          <g transform="translate(30 0)">
            {unimap.map((item) => {
              if (item.id != "test" && item.id != "text") {
                return (
                  <Popup
                    trigger={
                      <path id={item.id} className={item.class} d={item.d} />
                    }
                    position="top center"
                    className="newscard"
                    arrow={false}
                    modal
                  >
                    {item.id}
                  </Popup>
                );
              } else {
                return <path id={item.id} className={item.class} d={item.d} />;
              }
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
export default Unimap;
