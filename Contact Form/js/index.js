document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const contactTable = document
    .getElementById("contactTable")
    .getElementsByTagName("tbody")[0];
  const sortByName = document.getElementById("sortByName");
  const sortByPhone = document.getElementById("sortByPhone");
  const sortByEmail = document.getElementById("sortByEmail");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const saveContacts = () => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const renderContacts = () => {
    contactTable.innerHTML = "";
    contacts.forEach((contact, index) => {
      const row = contactTable.insertRow();
      row.insertCell(0).innerText = contact.name;
      row.insertCell(1).innerText = contact.phone;
      row.insertCell(2).innerText = contact.email;
      const actionsCell = row.insertCell(3);
      actionsCell.classList.add("actions");

      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerText = "Redaktə";
      editButton.addEventListener("click", () => editContact(index));
      actionsCell.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerText = "Sil";
      deleteButton.addEventListener("click", () => deleteContact(index));
      actionsCell.appendChild(deleteButton);
    });
  };

  const addContact = (name, phone, email) => {
    contacts.push({ name, phone, email });
    saveContacts();
    renderContacts();
  };

  const editContact = (index) => {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;

    contactForm.onsubmit = (e) => {
      e.preventDefault();
      contacts[index] = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
      };
      saveContacts();
      renderContacts();
      contactForm.reset();
      contactForm.onsubmit = onSubmitHandler;
    };
  };

  const deleteContact = (index) => {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  };

  const sortContacts = (key) => {
    contacts.sort((a, b) => a[key].localeCompare(b[key]));
    saveContacts();
    renderContacts();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    addContact(name, phone, email);
    contactForm.reset();
  };

  sortByName.addEventListener("click", () => sortContacts("name"));
  sortByPhone.addEventListener("click", () => sortContacts("phone"));
  sortByEmail.addEventListener("click", () => sortContacts("email"));
  contactForm.addEventListener("submit", onSubmitHandler);

  renderContacts();
});
