import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import "./Addrack.css"
import "./Navbar.css"

function Addrack({modalShow, setModalShow}) {
    const handleClose = () =>{
        console.log(modalShow);
        setModalShow(false);
    }
    const handleShow = () =>{
        console.log(modalShow);
        setModalShow(true);
    } 
    return (
        <>
            <Button 
            className='btn-nav'
            onClick={handleShow}>Add Racks</Button> 
            <Modal
                dialogClassName='modal'
                show={modalShow}
                onHide={handleClose}
            >
            <Modal.Header closeButton>
          <Modal.Title >Add Racks </Modal.Title>
        </Modal.Header>
        <Modal.Body><form className='add-form'>
        <div className='form-control'>
            <label>Location</label>
            <input type='text' placeholder='Add'/>
        </div>

    </form></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Rack
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default Addrack
