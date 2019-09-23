import * as React from 'react';
import ItemInput from '../components/ItemInput';
import { Item } from "../models/ItemsStore";

export interface ItemInputContainerProps {
    itemList: any;
}

const addItem = (name: string, value: number, category: string, itemList: any): void => {
    fetch('https://localhost:5001/api/contentLimitItems/', {
        body: JSON.stringify({
            'category': category,
            'name': name,
            'value': value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST' 
    })
    .then(response => response.json())
    .then(record => {
        if (record.isSuccess) {
            itemList.add(
                Item.create({
                    guid: "",
                    name,
                    value,
                }),
                category,
            ); 
        }
        else {
            // TODO: Create a UI element to show the errors
            throw new Error(record.messages.join(", "))
        }     
    });
};

export const ItemInputContainer = ({itemList}: ItemInputContainerProps) => {
    const handleAdd = (name: string, value: number, category: string) => addItem(name, value, category, itemList);
    return (
        <ItemInput handleAdd={handleAdd} />        
    );
}

export default ItemInputContainer;
