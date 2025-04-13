import React, {ReactNode, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.css';
import ModalOverlay from "./modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type ModalProps = {
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
                          onClose,
                          title,
                          children
                      }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const escFunc = (e: KeyboardEvent) => (e.key === "Escape") && onClose();
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

    const portalElement = document.getElementById('portal');
    return portalElement ? ReactDOM.createPortal(portalContent, portalElement) : null;
}
