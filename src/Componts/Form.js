import React, { useState } from "react";

export default function Form(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phoneNumber, address, message } = user;

    if (name && email && phoneNumber && address && message) {
      const res = await fetch(
        "https://contect-form-2ba5d-default-rtdb.firebaseio.com/youtuberform.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            address,
            message,
          }),
        }
      );
      if (res) {
        setUser({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          message: "",
        });
        alert("Data Stored Successfully");
      }
    } else {
      alert("Please fill all The Data");
    }
  };
  return (
    <>
      <h1>{props.heading}</h1>
      <form className="row g-3" method="POST">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={getUserData}
            value={user.name}
            autocompleted="off"
            placeholder="Name"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={getUserData}
            value={user.email}
            autocompleted="off"
            placeholder="Eamil"
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={getUserData}
            value={user.phoneNumber}
            placeholder="Phone Number"
            autocompleted="off"
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            onChange={getUserData}
            value={user.address}
            autocompleted="off"
            required
          />
        </div>

        <div className="md-form amber-textarea active-amber-textarea-2">
          <textarea
            id="form16"
            rows="3"
            className="md-textarea form-control"
            name="message"
            onChange={getUserData}
            value={user.message}
            placeholder="Your Message here ...."
          >
            {" "}
          </textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={postData}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
