// Main.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";

export const Main = ({}) => {
  const { setShowAddPage, contactInfos, searchTerm, deleteContact } =
    UseContact();

  function handleShow() {
    setShowAddPage(true);
  }

  const filteredContacts = contactInfos.filter((contactInfo) =>
    contactInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Main">
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
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: "#146aff" }}
                    className="user-icon"
                  />
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{contactInfo.name}</h3>
                  <h2 className="contact-phone">{contactInfo.phone}</h2>
                  <h4 className="contact-email">{contactInfo.email}</h4>
                </div>
                <div className="edit-icons">
                  {" "}
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <br></br>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteContact(contactInfo.id)}
                  />
                </div>
              </div>
              <hr></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
