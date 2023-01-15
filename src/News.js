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
import { faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons";
function News() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const ref = useRef(null);
  const closePopup = () => ref.current.close();
  let navigate = useNavigate();

  function getDateDe(date) {
    let newdate = date.substring(0, 26);
    let day = date.substring(0, 3);
    let daydate = date.substring(5, 7);
    let monat = date.substring(8, 11);
    let years = date.substring(12, 16);
    let time = date.substring(17, 22);
    let dayde = "";
    let monatde = "";

    switch (day) {
      case "Sun":
        dayde = "Sonntag";
        break;
      case "Mon":
        dayde = "Montag";
        break;
      case "Tue":
        dayde = "Dienstag";
        break;
      case "Wed":
        dayde = "Mittwoch";
        break;
      case "Thu":
        dayde = "Do";
        break;
      case "Fri":
        dayde = "Freitag";
        break;
      case "Sat":
        dayde = "Samstag";
        break;
    }
    switch (monat) {
      case "Jan":
        monatde = "01";
        break;
      case "Feb":
        monatde = "02";
        break;
      case "Mar":
        monatde = "03";
        break;
      case "Apr":
        monatde = "04";
        break;
      case "May":
        monatde = "05";
        break;
      case "Jun":
        monatde = "06";
        break;
      case "Jul":
        monatde = "07";
        break;
      case "Aug":
        monatde = "08";
        break;
      case "Sep":
        monatde = "09";
        break;
      case "Oct":
        monatde = "10";
        break;
      case "Nov":
        monatde = "11";
        break;
      case "Dec":
        monatde = "12";
        break;
    }

    return (
      dayde +
      ", " +
      daydate +
      "." +
      monatde +
      "." +
      years +
      ", " +
      time +
      " Uhr"
    );
  }

  useEffect(() => {
    fetch("https://rss.orf.at/oesterreich.xml")
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        setLoading(false);
        for (let i = 10; i < xml.children[0].children.length; i++) {
          setNews((news) => [...news, xml.children[0].children[i].children]);
        }
        console.log(xml);
      })
      .catch((err) => console.log(err));
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
              icon={faNewspaper}
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
        {news.map((item, index) => {
          let imgurl = "";
          if (item.length >= 7) {
            imgurl = item[6].attributes.url;
          } else {
            imgurl =
              "https://www.tieraerztekammer.at/fileadmin/daten/_processed_/7/1/csm_ORF.AT_LOGO_f7627ac07c.jpg";
          }

          let pupdate = item[5].value;
          return (
            <div>
              <Popup
                ref={ref}
                trigger={
                  <div className="row mt-3 m-2 lh-1 gap-2 bib">
                    <div className="col-5">{<img src={imgurl} />}</div>
                    <div className="col lh-1">
                      <h1>{item[0].value}</h1>
                      <p>{item[4].value}</p>
                      <p>{getDateDe(pupdate)}</p>
                      <div className="row"></div>
                    </div>
                  </div>
                }
                position="top center"
                className="newscard"
                arrow={false}
                modal
                closeOnDocumentClick={false}
              >
                <div className="popupnews text-center bib">
                  <div className="row">
                    <h1>{item[0].value}</h1>
                  </div>
                  <div className="row">{<img src={imgurl} width="360" />}</div>
                  <div className="row">
                    <h3>{item[3].value}</h3>
                    <br />
                    <p>{getDateDe(pupdate)}</p>
                  </div>
                  <button
                    className="close bg-indicatorbackground"
                    onClick={closePopup}
                  >
                    X
                  </button>
                </div>
              </Popup>
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
export default News;

/* <div key={index}>
<Card className="bg-dark mt-4">
  <h1 className="fs-5">{item.TITEL}</h1>
  {/* {console.log(item.ANHANG.length)} 
</Card>
</div> */
