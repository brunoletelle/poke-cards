import "../styles/components/Modal.scss"

export default function Modal({isOpen, close, children}){
    
    return(
        <article className={`modal ${isOpen && "is-open"}`}>
            <div className="modal-container"  onClick={() => close()}>
                <button className="modal-close" onClick={() => close()}>Cerrar</button>
                <div>
                    {children}
                </div>
            </div>
        </article>
    )

}