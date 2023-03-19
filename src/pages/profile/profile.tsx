import React from "react";
import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import StructureProfile from '../../components/structure-profile/structure-profile';

const ProfilePage = () => {
  return (
    <section className={styles.section}>
      <StructureProfile />
      <Outlet />
    </section>
  );
}

export default React.memo(ProfilePage);