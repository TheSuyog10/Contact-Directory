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

  const {
    addContact,

    message,
    setMessage,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    image,
    setImage,
    handleImageChange,
  } = UseContact();

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

    const newContact = {
      id: nanoid(),
      name: name,
      phone: phone,
      email: email,
      image: image,
    };
    addContact(newContact);
  };

  function handleClose() {
    setShowAddPage(false);
    setName("");
    setEmail("");
    setImage(null);
    setPhone("");
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
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
              autoComplete="off"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="inputGroup">
            <input
              type="number"
              required
              autoComplete="off"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event)}
            />
            <label htmlFor="phone">Phone No</label>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              required
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputGroup images">
            <input
              type="file"
              accept="image/*"
              autoComplete="off"
              id="image"
              onChange={(e) => handleImageChange(e)}
              onKeyPress={(event) => handleKeyPress(event)}
            />

            <label htmlFor="image">Picture</label>
            <span className="image-container">
              {image && <img src={image} alt="Preview" className="image" />}
            </span>
          </div>
        </div>
        <button
          className="add-contacts"
          onClick={handleSubmit}
          onKeyPress={(event) => handleKeyPress(event)}
        >
          Add Contact
        </button>
      </div>
    </div>
  );
};
