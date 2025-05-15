import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Share/FireBase/index";
import emailjs from "emailjs-com";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
} from "../../Components/Toast";
import RingLoader from "../../Components/RingLoader";
import HeaderBar from "../../Components/Headbar";

Modal.setAppElement("#root");

export default function Profile() {
  const { state } = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isloading, setisLoading] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userLocation: "",
    therapistId: state?.id || "",
    therapistName: state?.name || "",
    therapistSpecialization: state?.specialization || "",
    therapistEmail: state?.email || "",
    appointmentDate: "",
    appointmentTime: "",
    status: "pending",
    createdAt: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      sendAppointmentEmails(appointmentData);

      notifySuccess("Appointment booked successfully!");
      setModalIsOpen(false);
      resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
      notifyError("Error booking appointment. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const sendAppointmentEmails = (data: any) => {
    const userEmailTemplate = {
      user_name: data.userName,
      user_email: data.userEmail,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      therapist_name: data.therapistName,
      therapist_specialization: data.therapistSpecialization,
    };

    emailjs
      .send(
        "service_6gnuozm", // ✅ Your EmailJS service ID
        "template_1sr1sk6", // ✅ Your EmailJS user template ID
        userEmailTemplate,
        "T1eJoCXb1R1bXkDjC" // ✅ Your EmailJS public key
      )
      .then((response) => {
        console.log("User email sent:", response.text);
      })
      .catch((error) => {
        console.error("Error sending user email:", error);
      });

    const professionalEmailTemplate = {
      professional_name: data.therapistName,
      professional_email: data.therapistEmail,
      user_name: data.userName,
      user_email: data.userEmail,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
    };

    emailjs
      .send(
        "service_csxml1i",
        "template_1sr1sk6", // ✅ Your therapist/coach template ID
        professionalEmailTemplate,
        "T1eJoCXb1R1bXkDjC" // ✅ Your EmailJS public key
      )
      .then((response) => {
        notifySuccess("Professional email sent");
      })
      .catch((error) => {
        notifyError("Error sending professional email:");
      });
  };

  const resetForm = () => {
    setAppointmentData({
      userName: "",
      userEmail: "",
      userPhone: "",
      userLocation: "",
      therapistId: state?.id || "",
      therapistName: state?.name || "",
      therapistSpecialization: state?.specialization || "",
      therapistEmail: state?.email || "",
      appointmentDate: "",
      appointmentTime: "",
      status: "pending",
      createdAt: null,
    });
  };

  return (
    <>
      <HeaderBar heading="Profile" />
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            src={
              state?.image ||
              "data:image/jpeg;base64,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"
            }
            alt="Coach Profile"
            className={styles.avatar}
          />
          <h2 className={styles.name}>{state?.name}</h2>
          <p className={styles.field}>
            <strong>Specialization:</strong> {state?.specialization}
          </p>
          <p className={styles.field}>
            <strong>Location:</strong> {state?.location}
          </p>
          <p className={styles.field}>
            <strong>Pricing:</strong> {state?.price}
          </p>
          <p className={styles.bio}>{state?.bio}</p>
          <button
            className={styles.button}
            onClick={() => setModalIsOpen(true)}
          >
            {isloading ? (
              <RingLoader size={20} color="#0000000" />
            ) : (
              "📅 Book Appointment"
            )}
          </button>
        </div>

        {modalIsOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2
                  style={{
                    marginBottom: "16px",
                    fontWeight: "400",
                    fontSize: "32px",
                  }}
                >
                  Book Appointment with {state?.name}
                </h2>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Your Name"
                    type="text"
                    name="userName"
                    value={appointmentData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Email"
                    type="email"
                    name="userEmail"
                    value={appointmentData.userEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    name="userPhone"
                    value={appointmentData.userPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Your Location"
                    type="text"
                    name="userLocation"
                    value={appointmentData.userLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="date"
                    placeholder="Preferred Date"
                    name="appointmentDate"
                    value={appointmentData.appointmentDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="time"
                    placeholder="Preferred Time"
                    name="appointmentTime"
                    value={appointmentData.appointmentTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => setModalIsOpen(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Confirm Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
