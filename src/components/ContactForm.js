import React from "react";
import { useForm } from "../hooks/useForm";
import { useModal } from "../hooks/useModal";
import { Loader } from "./Loader";
import { Message } from "./Message";
import Modal from "./Modal";
import FormMail1 from "../assets/FormMail1.png";

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
  const [isOpen, openModal, closeModal] = useModal(false);

  return (
    <div className="ComponentContainer">
      <h2>Contact Form</h2>
      <button className="btn btn-primary btn-lg" onClick={openModal}>
        About Contact Form
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="ExplinationModal">
          <h3>
            About Nested Selects with useForm{" "}
            <a
              href="https://github.com/reche-git/02-React-Exercises/tree/master/src/hooks"
              rel="noreferrer"
              target="_blank"
            >
              useForm
            </a>{" "}
            hook
          </h3>
          <p>
            Thanks to{" "}
            <a href="https://formsubmit.co/" rel="noreferrer" target="_blank">
              FormSubmit
            </a>
            , you can use his form endpoint to send emails without PHP,
            Javascript or any backend code required.
          </p>
          <hr />
          <p>
            The email that you put in the input would be the email where
            this form would be sent (so you can see that it work in a practical way). First you will recieve an email from
            FormSubmit asking if they can use your email in the first place,
            like this:
          </p>
          <img src={FormMail1} alt="MailAccept" />
          <p>And then the form that you had sent will appear in your inbox as an email!</p>
          <hr />
          <p>
            As a plus, I reuse 3 times the same select component! So much reused
            components 😲
          </p>
          <br />
        </div>
      </Modal>
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
      {response && (
        <Message msg="Form Submited! Check your email" bgColor="#198754" />
      )}
    </div>
  );
};

export default ContactForm;
