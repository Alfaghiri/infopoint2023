import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";
import QRCode from "react-qr-code";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPercent } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import RingLoader from "react-spinners/RingLoader";
function Deals() {
  const [deals, setDeals] = useState([]);
  const ref = useRef(null);
  const closePopup = () => ref.current.close();
  let navigate = useNavigate();

  const url = "https://dealinfo.herokuapp.com/";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setDeals(data);
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
              icon={faPercent}
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
        {deals.map((item) => {
          return (
            <Popup
              ref={ref}
              trigger={
                <div className="row mt-2 lh-1 gap-2 bib">
                  <div className="col-5 m-2">
                    <img src={item.image} />
                  </div>
                  <div className="col lh-1 mt-3 m-1">
                    <h1>{item.titel}</h1>
                    <div className="col-10  text-white">
                      <p>{item.des}</p>
                    </div>
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
                  <h1>{item.titel}</h1>
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
          );
        })}
      </div>
    </div>
  );
}
export default Deals;
