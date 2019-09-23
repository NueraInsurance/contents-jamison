import { observer } from 'mobx-react';
import * as React from 'react';
import { ListGroupItem, Panel } from 'react-bootstrap';
import '../css/ItemsList.css';
import Category from './Category';

export interface ItemsListProps {
    itemList: any;
}

const deleteItem = (index: number, category: string, itemList: any): void => {
    const itemToDelete = itemList.get(index, category).guid;
    // Only call the server if this is an item which we have saved
    if (itemToDelete && itemToDelete.length > 0)
    {
        fetch(`https://localhost:5001/api/contentLimitItems/${itemToDelete}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'DELETE' 
        })
        .then(response => response.json())
        .then(record => {
            if (record.isSuccess) {
                itemList.delete(index, category);
            }
            else {
                // TODO: Create a UI element to show the errors
                throw new Error(record.messages.join(", "))
            }     
        });
    }
    else {
        itemList.delete(index, category);
    }
    
};

export const ItemsList = ({itemList}: ItemsListProps) => {
    const handleDelete = (index: number, category: string) => deleteItem(index, category, itemList);
    return (
        <Panel className="items-list">
            <ListGroupItem className="categories">
                <Category name={'Electronics'} total={itemList.totalElectronicsValue} items={itemList.electronicsItems} handleDelete={handleDelete}/>
                <Category name={'Clothing'} total={itemList.totalClothingValue} items={itemList.clothingItems} handleDelete={handleDelete}/>
                <Category name={'Kitchen'} total={itemList.totalKitchenValue} items={itemList.kitchenItems} handleDelete={handleDelete}/>
                <Category name={'Misc'} total={itemList.totalMiscValue} items={itemList.miscItems} handleDelete={handleDelete}/>
            </ListGroupItem>
            <ListGroupItem className="total">
                <div>Total</div>
                <div className="total-value">{`$${itemList.totalValue}`}</div>
            </ListGroupItem>
        </Panel>
    )
}

    

export default observer(ItemsList);
