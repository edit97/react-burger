import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export const Modal = ({
                          onClose,
                          title,
                          children
                      }) => {
    const modalRef = useRef(null);

    console.log(' ref={modalElementRef}');
    useEffect(() => {
        const escFunc = (e) => (e.key === "Escape") && onClose();
        document.addEventListener('keydown', escFunc);

        return () => {
            document.removeEventListener('keydown', escFunc);
        }
    }, []);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            modalElement.focus();
        }
    }, []);

    const portalContent =
        <>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal_content}
                 ref={modalRef}
                 onClick={e => e.stopPropagation()}>
                <div className={styles.modal_content_caption}>
                    <span className="text text_type_main-medium">{title}</span>
                    <CloseIcon type="primary" className={styles.close_button}
                               onClick={onClose}/>
                </div>
                {children}
            </div>
        </>;

    return ReactDOM.createPortal(
        portalContent,
        document.getElementById('portal')
    );

}

Modal.propTypes = {
    // setModalActive: PropTypes.func.isRequired
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
};
