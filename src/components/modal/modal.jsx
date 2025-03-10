import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export const Modal = (props) => {
	useEffect(() => {
		const escFunc = (e) => (e.key === "Escape") && props.setModalActive(false);
		document.addEventListener('keydown', escFunc);

		return () => {
			document.removeEventListener('keydown', escFunc);
		}
	}, [props]);

    const portalContent =
	    <>
		    <ModalOverlay setModalActive={props.setModalActive}/>
	        <div className={styles.modal_content} onClick={e=>e.stopPropagation()}>
		        <div className={styles.modal_content_caption}>
					<span className="text text_type_main-medium">{props.header}</span>
					<CloseIcon type="primary" className={styles.close_button} onClick={()=>props.setModalActive(false)}/>
		        </div>
		        {props.children}
	        </div>
	    </>;

    return ReactDOM.createPortal(
	    portalContent,
        document.getElementById('portal')
    );

}

Modal.propTypes = {
	setModalActive: PropTypes.func.isRequired
};
