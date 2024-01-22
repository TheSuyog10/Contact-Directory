// ContactContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
  const [contactInfos, setContactInfos] = useState([]);
  const [showAddPage, setShowAddPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
  };
};
