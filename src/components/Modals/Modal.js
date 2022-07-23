import "./styles/Modal.scss"

export default function Modal({isOpen, close, children, hideClose}){
    
    return(
        <article className={`modal ${isOpen && "is-open"}`}>
            <div className="modal-container" onClick={() => close()}>
                {!hideClose&&<button className="modal-close" onClick={() => close()}>Cerrar</button>}
                <div>
                    {children}
                </div>
            </div>
        </article>
    )

}