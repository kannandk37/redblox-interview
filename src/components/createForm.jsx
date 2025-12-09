import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../core/storage/index.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CreateForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const navigate = useNavigate();
  const onChangeName = (e) => {
    if (e.target.value) {
      setName(e.target.value);
      setNameError("");
    } else {
      setName("");
    }
  };

  const onChangeEmail = (e) => {
    if (e.target.value) {
      setEmail(e.target.value);
      setEmailError("");
    } else {
      setEmail("");
    }
  };

  const onChangeComment = (e) => {
    if (e.target.value) {
      setComment(e.target.value);
      setCommentError("");
    } else {
      setComment("");
    }
  };

  const isValid = () => {
    if (!name) {
      setNameError("Please Enter Name");
    } else if (!email) {
      setEmailError("Please Enter Email");
    } else if (!emailPattern.test(email)) {
      setEmailError("Please Enter A Valid Email");
    } else if (!comment) {
      setCommentError("Please Enter Comment");
    } else {
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    if (isValid()) {
      const existing = JSON.parse(storage.getItem("comments")) || [];

      const maxId =
        existing.length > 0 ? Math.max(...existing.map((item) => item.id)) : 0;

      const newRecord = {
        id: maxId + 1,
        name,
        email,
        body: comment,
      };

      const updated = [...existing, newRecord];

      storage.setItem("comments", JSON.stringify(updated));
      setName("");
      setEmail("");
      setComment("");
    }
  };

  return (
    <>
      <button
        style={{
          width: "80px",
          height: "30px",
          color: "white",
          background: "black",
          display: "block",
        }}
        onClick={() => {
          navigate("/list");
        }}
      >
        Back
      </button>
      <p
        style={{
          width: "300px",
          height: "45px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Add Comment
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <text style={{ margin: "0px", textAlign: "left" }}>Name</text>
        <input
          style={{ width: "220px", height: "30px", fontSize: "18px" }}
          placeholder="Name"
          onChange={(e) => onChangeName(e)}
          value={name}
          type="text"
          maxLength={12}
        />
        {nameError && (
          <p
            style={{
              textAlign: "left",
              margin: "0px",
              fontWeight: "bold",
              fontSize: "15px",
              color: "red",
            }}
          >
            {nameError}
          </p>
        )}
        <text style={{ margin: "0px", textAlign: "left" }}>Email</text>
        <input
          style={{ width: "220px", height: "30px", fontSize: "18px" }}
          placeholder="Email"
          onChange={(e) => onChangeEmail(e)}
          value={email}
        />
        {emailError && (
          <p
            style={{
              textAlign: "left",
              margin: "0px",
              fontWeight: "bold",
              fontSize: "15px",
              color: "red",
            }}
          >
            {emailError}
          </p>
        )}
        <text style={{ margin: "0px", textAlign: "left" }}>Comment</text>
        <input
          style={{ width: "720px", height: "60px", fontSize: "18px" }}
          placeholder="Comment"
          onChange={(e) => onChangeComment(e)}
          value={comment}
        />
        {commentError && (
          <p
            style={{
              textAlign: "left",
              margin: "0px",
              fontWeight: "bold",
              fontSize: "15px",
              color: "red",
            }}
          >
            {commentError}
          </p>
        )}
        <button
          style={{
            width: "80px",
            height: "30px",
            color: "white",
            background: "black",
          }}
          onClick={() => onSubmit()}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateForm;
