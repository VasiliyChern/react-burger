import styles from './profile-history-orders.module.css';
import { StructureProfile } from '../../components/structure-profile/structure-profile';
import { HistoryOrdersProfile } from '../../components/history-orders-profile/history-orders-profile';

export const ProfileHistoryOrdersPage = () => {
  return (
    <section className={styles.section}>
      <StructureProfile tabActive={'orders'} />
      <HistoryOrdersProfile />
    </section>
  );
}
