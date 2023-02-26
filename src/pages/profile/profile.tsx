import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { StructureProfile } from '../../components/structure-profile/structure-profile';

export const ProfilePage = () => {
  return (
    <section className={styles.section}>
      <StructureProfile />
      <Outlet />
    </section>
  );
}
