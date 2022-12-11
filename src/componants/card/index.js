import React, { useState, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noImg from "../../assets/NoImageFound.png"
import axios from 'axios';
import { Buffer } from 'buffer';

function ImageCard() {
    useEffect(() => {
        document.title = 'Card';
      });
    
    const [show, setShow] = useState(false);
    const [imageFront, setImageFront] = useState("");
    const [imageBack, setImageBack] = useState("");
    const handleClose = () => {
        setShow(false);
        refreshPage()
    }
    const handleShow = () => setShow(true);
    const hiddenFileInput = React.useRef(null);


    const onFileChange = (event) => {

        let file = event.target.files[0];

        setImageFront({ imageFront: file });
    };

    const refreshPage = () => {
        window.location.reload();
    }
    const onFileChangeBack = (event) => {

        let file = event.target.files[0];

        setImageBack({ imageBack: file });
    };
    const onFileUploadBack = async e => {
        e.preventDefault();
        let data = new FormData();

        data.append('imageBack', imageBack.imageBack);

        axios.post('http://localhost:8081/api/image-upload-back', data)
            .then(res => {
                console.log(res.data + 'this is data after api call');
            })
            .catch(err => console.log(err));

    };
    const onFileUpload = async e => {
        e.preventDefault();
        let data = new FormData();

        data.append('imageFront', imageFront.imageFront);

        axios.post('http://localhost:8081/api/image-upload-front', data)
            .then(res => {
                console.log(res.data + 'this is data after api call');
            })
            .catch(err => console.log(err));

    };

    const getImageFront = () => {
        axios.get('http://localhost:8081/uploads/front.jpg')
            .then(response => {

                let img = Buffer.from(response.data, 'binary').toString('base64')
                setImageFront(img);

            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getImageFront()
    }, []);
    return (
        <>
            <div className="container">
                <div style={{ padding: '3%' }}>
                    <div className="card col-12">
                        <div className="card-body text-center">
                            <h2 style={{ padding: '2%' }}>Certificate Card</h2>
                            <div id="card">
                                <div className="front">
                                    <img className="imgSize" src={"http://localhost:8081/uploads/front.jpg"}></img>
                                </div>
                                <div className="back">
                                    <img className="imgSize" src={"http://localhost:8081/uploads/back.jpg"}></img>
                                </div>
                            </div>
                            <br />
                            <div class="text-end">
                                <button className="btn btn-secondary" onClick={handleShow}><i class="bi bi-pencil-square"></i> Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={show} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Front</p>
                        <div>
                            {/* <img src={noImg}></img> <br/><br/> */}
                            <input type="file" onChange={onFileChange} />
                            <button className="btn btn-secondary" onClick={onFileUpload}>Upload!</button>
                        </div> <br />
                        <p>Back</p>
                        <div>
                            <div>
                                {/* <img src={noImg}></img> <br/><br/> */}
                                <input type="file" onChange={onFileChangeBack} />
                                <button className="btn btn-secondary" onClick={onFileUploadBack}>Upload!</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <footer>
                <div className='text-center p-3' style={{ position: 'fixed', bottom: '0px', right: '0px', left: '0px' }}>
                    Copyright &copy; {new Date().getFullYear()}
                </div>
            </footer>
        </>
    )
}

export default ImageCard