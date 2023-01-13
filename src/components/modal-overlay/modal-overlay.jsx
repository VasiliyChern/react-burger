import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css"

const ModalOverlay = (props) => { 
  return (
    <div className={styles.modaloverlay} onClick={props.onClick} />
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;
