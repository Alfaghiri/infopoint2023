import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboard.css";
import Popup from "reactjs-popup";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import layout from "simple-keyboard-layouts/build/layouts/german";
import { FaBusinessTime } from "react-icons/fa";
import Clock from "react-live-clock";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Alert } from "bootstrap";
function Buchen() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userinput, setUserInput] = useState("");
  const [passinput, setPassInput] = useState("");
  const [user, setUser] = useState("");
  const [cinput, setCinput] = useState("0");
  const [layoutName, setLayoutName] = useState("default");
  const ref = useRef();
  const openTooltip = () => ref.current.open();
  const closeTooltip = () => ref.current.close();
  const ref1 = useRef();
  const openTooltip1 = () => ref1.current.open();
  const closeTooltip1 = () => ref1.current.close();
  const ref2 = useRef();
  const openTooltip2 = () => ref2.current.open();
  const closeTooltip2 = () => ref2.current.close();
  const usersCollrctionRef = collection(db, "users");
  var today = new Date();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, userinput, passinput);
      alert(userinput + " is Logged in");
    } catch (error) {
      alert(error.message);
    }
  };
  /* useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollrctionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []); */
  function handleShift(button) {
    let inputkey = userinput;
    if (button != "{lock}" && button != "{LOCK}" && button != "&#10533") {
      setUserInput(userinput + button);
    }
    console.log(button);
    console.log(cinput);
    if (button == "&#10533") {
      closeTooltip();
    }
    if (button == "{lock}") {
      setLayoutName("shift");
    }
    if (button == "{LOCK}") {
      setLayoutName("default");
    }
    if (button == "{bksp}") {
      setUserInput(
        inputkey.substring(0, cinput - 1) +
          inputkey.substring(cinput, userinput.length)
      );
      setCinput(cinput - 1);
    }
  }
  function handleShift2(button) {
    let inputkey = passinput;
    if (button != "{lock}" && button != "{LOCK}" && button != "&#10533") {
      setPassInput(passinput + button);
    }
    console.log(button);
    console.log(cinput);
    if (button == "&#10533") {
      closeTooltip1();
    }
    if (button == "{lock}") {
      setLayoutName("shift");
    }
    if (button == "{LOCK}") {
      setLayoutName("default");
    }
    if (button == "{bksp}") {
      setPassInput(
        inputkey.substring(0, cinput - 1) +
          inputkey.substring(cinput, passinput.length)
      );
      setCinput(cinput - 1);
    }
  }
  function handleuserinput(e) {
    e += userinput;
  }
  function handlepassinput(e) {
    e += passinput;
  }
  function handleinputclick(e) {
    closeTooltip1();
    openTooltip();
    setCinput(e.target.selectionStart);
  }
  function handlesubmit() {
    if (userinput == "abdul" && passinput == "1998") {
      return <div>Correct</div>;
    } else return openTooltip2();
  }
  function handleinputclick1(e) {
    closeTooltip();
    openTooltip1();
    setCinput(e.target.selectionStart);
  }
  return (
    <div className="bg-dark homesite">
      <br />
      <h1>
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"AT/Pacific"} />
      </h1>
      <FaBusinessTime
        size={100}
        color={"white"}
        onClick={() => {
          navigate("/");
        }}
      />
      <br />
      <br />
      <br />
      <input
        value={userinput}
        placeholder={"Benutzername"}
        onClick={(e) => {
          handleinputclick(e);
        }}
      />
      <br />
      <br />
      <input
        value={passinput}
        placeholder={"Passwort"}
        onClick={(e) => {
          handleinputclick1(e);
        }}
      />
      <br />
      <br />
      <Popup
        ref={ref2}
        trigger={<div></div>}
        position="top center"
        className="card"
        arrow={false}
        modal
      >
        <div className="text-center">
          <Row>
            <Col sm={4}>
              <img
                src="https://media-exp1.licdn.com/dms/image/C5603AQHq_v5yQpF7EQ/profile-displayphoto-shrink_800_800/0/1657051265632?e=2147483647&v=beta&t=ATGztVjm7aT0DyCSazh8FKhrRng6j5Tj7D46-Oe3JH8"
                className="avatar"
              />
            </Col>
            <Col>
              <br />
              <p>
                Abdul Wahhab Alfaghiri Al Anzi <br /> gebucht um <br />{" "}
                {today.getHours() +
                  ":" +
                  today.getMinutes() +
                  ":" +
                  today.getSeconds()}{" "}
                <br />
              </p>
            </Col>
          </Row>
        </div>
      </Popup>
      <Button variant="success" size="lg" onClick={openTooltip2}>
        Buchen
      </Button>
      <Popup
        ref={ref}
        trigger={<div></div>}
        position="bottom left"
        className="key"
        arrow={false}
        closeOnDocumentClick={false}
      >
        <div className="touch_keyboard">
          <Keyboard
            onChange={(e) => {
              handleuserinput(e);
            }}
            layout={{
              default: [
                "^ 1 2 3 4 5 6 7 8 9 0 \u00DF \u00B4 {bksp}",
                "q w e r t z u i o p \u00FC +",
                "{lock} a s d f g h j k l \u00F6 \u00E4 #",
                "< y x c v b n m , . -",
                ".com @ {space} &#10533",
              ],
              shift: [
                "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                "Q W E R T Y U I O P { } \u00dc |",
                '{LOCK} A S D F G H J K L : " \u00d6 \u00c4',
                "Z X C V B N M < > ?",
                ".com @ {space} &#10533",
              ],
            }}
            display={{
              "{LOCK}": "caps",
              "{lock}": "caps",
              "{bksp}": "Entf",
              "{space}": "           ",
            }}
            theme={"hg-theme-default"}
            layoutName={layoutName}
            onKeyPress={(button) => handleShift(button)}
          />
        </div>
      </Popup>
      <Popup
        ref={ref1}
        trigger={<div></div>}
        position="bottom left"
        className="key"
        arrow={false}
        closeOnDocumentClick={false}
      >
        <div className="touch_keyboard">
          <Keyboard
            onChange={(e) => {
              handlepassinput(e);
            }}
            layout={{
              default: [
                "^ 1 2 3 4 5 6 7 8 9 0 \u00DF \u00B4 {bksp}",
                "q w e r t z u i o p \u00FC +",
                "{lock} a s d f g h j k l \u00F6 \u00E4 #",
                "< y x c v b n m , . -",
                ".com @ {space} &#10533",
              ],
              shift: [
                "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                "Q W E R T Y U I O P { } \u00dc |",
                '{LOCK} A S D F G H J K L : " \u00d6 \u00c4',
                "Z X C V B N M < > ?",
                ".com @ {space} &#10533",
              ],
            }}
            display={{
              "{LOCK}": "caps",
              "{lock}": "caps",
              "{bksp}": "Entf",
              "{space}": "           ",
            }}
            theme={"hg-theme-default"}
            layoutName={layoutName}
            onKeyPress={(button) => handleShift2(button)}
          />
        </div>
      </Popup>
    </div>
  );
}
export default Buchen;
