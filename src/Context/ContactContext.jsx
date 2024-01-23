// ContactContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
  const [contactInfos, setContactInfos] = useState([]);
  const [showAddPage, setShowAddPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedContacts =
      JSON.parse(localStorage.getItem("contactInfos")) || [];
    setContactInfos(storedContacts);
  }, []);

  const addContact = (newContact) => {
    setContactInfos((prevContacts) => {
      const updatedContacts = [...prevContacts, newContact];
      const sortedContacts = updatedContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      updateLocalStorage(sortedContacts);
      return sortedContacts;
    });
  };

  const updateLocalStorage = (contacts) => {
    localStorage.setItem("contactInfos", JSON.stringify(contacts));
  };
  const deleteContact = (id) => {
    setContactInfos((prevValue) => {
      const updatedContacts = prevValue.filter((contact) => contact.id !== id);
      updateLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setSuccessMessage(
      <span>
        {" "}
        <FontAwesomeIcon icon={faCheckCircle} />
        Contact Deleted Successfully
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };
  function toggleTheme() {
    setDarkMode((prevValue) => {
      console.log("Toggle theme called", !prevValue);
      return !prevValue;
    });
  }

  return (
    <ContactContext.Provider
      value={{
        contactInfos,
        addContact,
        showAddPage,
        setShowAddPage,
        searchTerm,
        setSearchTerm,
        successMessage,
        setSuccessMessage,
        deleteContact,
        toggleTheme,
        darkMode,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const UseContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }

  const {
    contactInfos,
    addContact,
    showAddPage,
    setShowAddPage,
    searchTerm,
    setSearchTerm,
    successMessage,
    setSuccessMessage,
    deleteContact,
    toggleTheme,
    darkMode,
  } = context;

  return {
    contactInfos,
    addContact,
    showAddPage,
    setShowAddPage,
    searchTerm,
    setSearchTerm,
    successMessage,
    setSuccessMessage,
    deleteContact,
    toggleTheme,
    darkMode,
  };
};
