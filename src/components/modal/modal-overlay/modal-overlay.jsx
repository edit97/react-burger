import css from "./style.module.css";
import React from "react";

export const ModalOverlay = (props) => {
	return <div className={css.modal_overlay} onClick={props.onClose} />
}

export default ModalOverlay;
