import React from 'react';
import Button from '../Button';
import { ItemStatus } from '../NewItem';

interface ItemProps {
    onClick?: () => void;
    children: React.ReactNode;
    itemStatus: ItemStatus
}

const Item: React.FC<ItemProps> = ({ onClick, children, itemStatus }) => {
    const className = itemStatus == ItemStatus.Active ? 'primary' : 'secondary';
    return <Button variant={className} onClick={onClick}>{children}</Button>
}


export default Item;