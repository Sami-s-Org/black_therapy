import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './thankYou.module.css';

const ThankYouPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.checkmark}>✓</div>
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.message}>
          Your generous donation will help us continue our mission. We truly appreciate your support!
        </p>
        <div className={styles.details}>
          {/* <p>You'll receive a receipt via email shortly.</p> */}
          <p>Your contribution makes a real difference.</p>
        </div>
        <Link to="/" 
            style={{
                padding: '12px 20px',
                borderRadius: 8,
                background: '#635bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: '20px',
            }}>
            Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
