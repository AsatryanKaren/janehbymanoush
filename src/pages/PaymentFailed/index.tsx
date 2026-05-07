import PaymentOutcomeCard from "src/components/PaymentOutcomeCard";
import styles from "./styles.module.css";

const PaymentFailedPage: React.FC = () => (
  <div className={styles.page}>
    <PaymentOutcomeCard variant="failed" />
  </div>
);

export default PaymentFailedPage;
