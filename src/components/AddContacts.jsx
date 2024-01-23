import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faTriangleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";
import { nanoid } from "nanoid";

export const AddContacts = () => {
  const { showAddPage, setShowAddPage, darkMode } = UseContact();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { addContact, setSuccessMessage } = UseContact();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setMessage("Empty Fields");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid Email");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("Invalid Number");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    const newContact = { id: nanoid(), name: name, phone: phone, email: email };
    addContact(newContact);
    setShowAddPage(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} /> Contact Added Successfully!!
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  function handleClose() {
    setShowAddPage(false);
  }

  return (
    <div className={`overlay ${showAddPage ? "show" : ""}`}>
      <div className={`form ${darkMode ? "" : "light"}`}>
        <div className="top">
          <h1>Add Contact</h1>
          <button className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        {message && (
          <div className="message">
            <FontAwesomeIcon icon={faTriangleExclamation} /> {message}
          </div>
        )}

        <div className="bottom">
          <div className="inputGroup">
            <input
              type="text"
              required
              autocomplete="off"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="inputGroup">
            <input
              type="number"
              required
              autocomplete="off"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone No</label>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              required
              autocomplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <button className="add-contacts" onClick={handleSubmit}>
          Add Contact
        </button>
      </div>
    </div>
  );
};
