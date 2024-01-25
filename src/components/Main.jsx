// Main.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";

export const Main = ({}) => {
  const {
    setShowAddPage,
    contactInfos,
    searchTerm,
    deleteContact,
    darkMode,
    toggleTheme,
    startEditingContact,
    image,
  } = UseContact();

  function handleShow() {
    setShowAddPage(true);
  }

  const filteredContacts = contactInfos.filter((contactInfo) =>
    contactInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`Main ${darkMode ? "" : "light"}`}>
      {!filteredContacts || filteredContacts.length === 0 ? (
        <div className="no-contacts">
          <img
            src="/Nocontact.png"
            alt="No Contacts Available"
            className="img-nocontacts"
          />
          <h2>No Contacts Found</h2>
          <button className="add-contact" onClick={handleShow}>
            Add Contact
          </button>
        </div>
      ) : (
        <div className="contact-list-container">
          {filteredContacts.map((contactInfo, index) => (
            <div key={index}>
              <div className="contact-lists">
                <div>
                  {contactInfo.image ? (
                    <img
                      src={contactInfo.image}
                      alt="User"
                      style={{
                        width: "3rem", // Set the width to match the icon
                        height: "3rem", // Set the height to match the icon
                        borderRadius: "56%",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ color: "#146aff" }}
                      className="user-icon"
                    />
                  )}
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{contactInfo.name}</h3>
                  <h2 className="contact-phone">{contactInfo.phone}</h2>
                  <h4 className="contact-email">{contactInfo.email}</h4>
                </div>
                <div className="edit-icons">
                  {" "}
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => startEditingContact(contactInfo.id)}
                    title="Edit Contact"
                  />
                  <br></br>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteContact(contactInfo.id)}
                    title="Delete Contact"
                  />
                </div>
              </div>
              <hr></hr>
            </div>
          ))}
        </div>
      )}
      <div className="toggle-button">
        <label className="toggle" htmlFor="switch">
          <input
            id="switch"
            className="inputs"
            type="checkbox"
            onChange={toggleTheme}
            checked={darkMode}
          />
          <div className="icons icon--moon">
            <svg
              height="32"
              width="32"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="icons icon--sun">
            <svg
              height="32"
              width="32"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
};
