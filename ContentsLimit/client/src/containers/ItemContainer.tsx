import * as React from 'react';
import Item from '../components/Item';

export interface ItemContainerProps {
    id: number,
    name: string;
    value: number;
    handleDeleteClick: any;
}

export const ItemContainer = ({id, name, value, handleDeleteClick}: ItemContainerProps) => {
    const onClick = () => { handleDeleteClick(id) };
    return (
        <Item
            name={name}
            value={value}
            handleDeleteClick={onClick}
        />        
    );
}

export default ItemContainer;
