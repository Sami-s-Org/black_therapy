// import React from "react";
// import styles from "./therapistCard.module.css";

// const TherapistCard = ({ data }) => {
//   const { name, city, state, specialty, photoUrl, credentials } = data;

//   return (
//     <div className={styles.card}>
//       <img
//         src={photoUrl || "/default.jpg"}
//         alt={name}
//         className={styles.photo}
//       />
//       <div className={styles.info}>
//         <h3>{name}</h3>
//         <p>{credentials}</p>
//         <p className={styles.location}>
//           {city}, {state}
//         </p>
//         <div className={styles.tags}>
//           {specialty?.map((s, i) => (
//             <span key={i}>{s}</span>
//           ))}
//         </div>
//         <a href={`/book/${data.id}`} className={styles.button}>
//           Book a Session
//         </a>
//       </div>
//     </div>
//   );
// };

// export default TherapistCard;

export {}
