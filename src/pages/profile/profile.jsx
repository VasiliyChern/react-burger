import styles from './profile.module.css';
import { StructureProfile } from '../../components/structure-profile/structure-profile';
import { UserProfile } from '../../components/user-profile/user-profile';

export const ProfilePage = () => {
  return (
    <section className={styles.section}>
      <StructureProfile tabActive={'user'} />
      <UserProfile />
    </section>
  );
}
