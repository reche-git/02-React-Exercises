import React from "react";
import { useForm } from "../hooks/useForm";
import {Loader} from "./Loader"
import {Message} from "./Message"

const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if (!form.name.trim()) {
    errors.name = "This subject is requiered.";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "You can only use letters and blank spaces";
  }

  if (!form.email.trim()) {
    errors.email = "This subject is requiered.";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = 'Try typing an email like "wearevalidating@email.com"';
  }

  if (!form.subject.trim()) {
    errors.subject = "This subject is requiered.";
  } 

  if (!form.comments.trim()) {
    errors.comments = "This subject is requiered.";
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments = "You can't exceed the 255 characters";
  }

  

  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useForm(initialForm, validationsForm);

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.name}
          required
        />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          required
        />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Subject..."
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.subject}
          required
        />
        {errors.subject && <p style={styles}>{errors.subject}</p>}
        <textarea
          name="comments"
          cols="50"
          rows="5"
          placeholder="Write your comment.."
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.comments}
          required
        ></textarea>
        {errors.comments && <p style={styles}>{errors.comments}</p>}
        <input type="submit" value="Send" />
      </form>
      {loading && <Loader />}
      {response && <Message msg="Form Submited! Check your email" bgColor="#198754"/>}
    </div>
  );
};

export default ContactForm;
