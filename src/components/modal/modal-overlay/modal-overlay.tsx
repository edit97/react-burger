import css from "./style.module.css";
import React from "react";

type ModalOverlayProps = {
	onClose: () => void;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
	return <div className={css.modal_overlay} onClick={props.onClose} />
}

export default ModalOverlay;
