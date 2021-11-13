import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

const CustomModal = props => {
    const { title, description, img, language, subTitle, url } = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="mr-2">View</Button>

            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center mb-4">
                        <img width="200px" src={img} alt="repositorie" />
                    </div>
                    <p>{subTitle}</p>
                    <p>{description}</p>
                    <p>language: {language}</p>
                    <p>Url: <a href={url} target="_blank" rel="noreferrer">{url}</a></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomModal;