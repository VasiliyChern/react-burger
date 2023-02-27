import styles from "./modal-overlay.module.css"

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay = (props: IModalOverlayProps) => { 
  return (
    <div className={styles.modaloverlay} onClick={props.onClick} />
  )
}

export default ModalOverlay;
