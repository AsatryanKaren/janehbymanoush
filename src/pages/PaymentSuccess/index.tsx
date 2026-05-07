import PaymentOutcomeCard from "src/components/PaymentOutcomeCard";
import styles from "./styles.module.css";

const PaymentSuccessPage: React.FC = () => (
  <div className={styles.page}>
    <PaymentOutcomeCard variant="success" />
  </div>
);

export default PaymentSuccessPage;
