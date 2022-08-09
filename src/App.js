import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import spinner from "./assets/spinner.gif";
import Footer from "./components/footer/Footer";
import axios from "axios";

function App() {
  const [control, setControl] = useState([]);
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);
  const url = "https://randomuser.me/api/";
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
  const [source, setSource] = useState();

  const getUser = async () => {
    try {
      const { data } = await axios.get(url);
      setSource(data.results);
      setLoading(false);
      handleName();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleName = () => {
    setTitle("My name is");
    setValue(
      `${source[0].name.title} 
    ${source[0].name.first}
     ${source[0].name.last}`
    );
  };
  const handleEmail = () => {
    setTitle("My email is");
    setValue(source[0].email);
  };
  const handleAge = () => {
    setTitle("My age is");
    setValue(source[0].dob.age);
  };

  const handleStreet = () => {
    setTitle("My address is");
    setValue([
      source[0].location.postcode,
      " ",
      source[0].location.country,
      " ",
      source[0].location.state,
    ]);
  };
  const handlePhone = () => {
    setTitle("My phone is");
    setValue(source[0].phone);
  };
  const handlePassword = () => {
    setTitle("My password is");
    setValue(source[0].login.password);
  };

  const newUser = () => {
    setLoading(true);
    setTitle("");
    setValue("");
    getUser();
  };
  const handleAdd = () => {
    const newObj = {
      name: source[0].name.first,
      email: source[0].email,
      phone: source[0].phone,
      age: source[0].dob.age,
    };
    if (!control.includes(source[0].email)) {
      setAdd([...add, newObj]);
      setControl([...add, source[0].email]);
    }
  };

  console.log(add);
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "10rem" }}>
          <img src={spinner} alt="" />
        </h1>
      ) : (
        <main>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={source ? source[0].picture.medium : defaultImage}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">{title}</p>
              <p className="user-value">
                {value
                  ? value
                  : `${source[0].name.title} 
    ${source[0].name.first}
     ${source[0].name.last}`}
              </p>
              <div className="values-list">
                <button onClick={handleName} className="icon" data-label="name">
                  <img
                    src={source[0].gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                  />
                </button>
                <button
                  onClick={handleEmail}
                  className="icon"
                  data-label="email"
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button onClick={handleAge} className="icon" data-label="age">
                  <img
                    src={
                      source[0].gender === "female" ? womanAgeSvg : manAgeSvg
                    }
                    alt="age"
                    id="iconImg"
                  />
                </button>
                <button
                  onClick={handleStreet}
                  className="icon"
                  data-label="street"
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  onClick={handlePhone}
                  className="icon"
                  data-label="phone"
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  onClick={handlePassword}
                  className="icon"
                  data-label="password"
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button onClick={newUser} className="btn" type="button">
                  new user
                </button>
                <button onClick={handleAdd} className="btn" type="button">
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {add.map((item) => {
                    const { name, email, phone, age } = item;
                    return (
                      <tr className="body-tr">
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{age}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}

export default App;
