import { useState } from "react";
import Button from "../Button";
import Modal from "../Model"
import TextField from "../TextField"
import { v4 as uuidv4 } from 'uuid';
import { useItemDispatch } from "../../itemProvider";
import Switch from "../Switch";

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
  const [checked, setChecked] = useState<boolean>(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const dispatch = useItemDispatch()
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setItemName('');
    setModalOpen(false);
  }

  const addStock = () => {
    const itemStatus = checked ? ItemStatus.Active : ItemStatus.Deactive;
    const newItem: ItemProps = {
      id: uuidv4(),
      item: itemName,
      expire: undefined,
      status: itemStatus
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
    <Button onClick={openModal}>New Item</Button>
    <Modal isOpen={isModalOpen} onClose={closeModal} title="New Item" footer={modalFooter}>
      <div>
        <TextField
          label="Item Name"
          placeholder="What's item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          variant="contained"
        />
       <br/>
        <Switch
          label="Active or out of stock ?"
          checked={checked}
          onChange={handleSwitchChange}
          variant="warning"
          size="medium"
        />
      </div>
    </Modal>
  </>
}

export default NewItem;