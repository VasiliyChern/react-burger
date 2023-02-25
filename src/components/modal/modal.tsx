import { useEffect, FunctionComponent, ReactElement } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModalProps {
  title?: string;
  children?: ReactElement;
  onClose: () => void;
}

const Modal: FunctionComponent<IModalProps> = (props) => {

  useEffect(() => {

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleEscape)
  
    return () => {
      document.removeEventListener('keydown', handleEscape);
    }

  }, [props])
  
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
    ), document.getElementById("modals")!
  )
}

export default Modal;