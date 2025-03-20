import { useState } from "react";
import Button from "../Button";
import Modal from "../Model"
import TextField from "../TextField"
import { v4 as uuidv4 } from 'uuid';
import { useItem, useItemDispatch } from "../../itemProvider";

export enum ItemStatus {
    Active,
    Deactive
  }
  
export interface ItemProps {
    id: string,
    item: String,
    expire?: Date,
    status: ItemStatus
  }

const NewItem = () => {
    const [itemName, setItemName] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch  = useItemDispatch()
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
      setItemName('');
      setModalOpen(false);
    }
  
    const addStock = () => {
      const newItem: ItemProps = {
        id: uuidv4(),
        item: itemName,
        expire: undefined,
        status: ItemStatus.Active
      }
  
      dispatch({ 
        type: "ADD", 
        payload: newItem 
      })
      
      closeModal();
    }

    const modalFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>

          <Button variant='primary' onClick={addStock}>
            Confirm
          </Button>
        </div>
    );

    return <>
        <Button onClick={openModal}>เพิ่มของ</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="เพิ่มของ" footer={modalFooter}>
        <div>
          <TextField
            label="ชื่อสิ่งของ"
            placeholder="ชื่อสิ่งของที่เพิ่งซื้อมา"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            variant="contained"
          />
        </div>
      </Modal>
    </>
}

export default NewItem;