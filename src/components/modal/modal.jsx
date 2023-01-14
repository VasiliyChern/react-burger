import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = (props) => {
  
  React.useEffect(() => {

    function handleEscape(e) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleEscape)
  
    return () => {
      document.removeEventListener('keydown', handleEscape);
    }

  }, [])
  
  return ReactDOM.createPortal( (
    <section className={styles.modalwindow}>
      <ModalOverlay onClick={props.onClose} />
      
      <div id='modalcontainer' className={`${styles.modalcontainer} pl-10 pt-10 pr-10`}>

        <div className={`${styles.header} pr-10 mb-10`}>
          <p className="text text_type_main-large ml-10">{props.title}</p>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>

        <>
          {props.children}
        </>

      </div>
    </section>
    ), document.getElementById('modals')
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired
}

export default Modal;