import * as React from 'react';
import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';
import '../css/Item.css';

export interface ItemProps {
    name: string;
    value: number;
    handleDeleteClick: any;
}

export const Item = ({name, value, handleDeleteClick}: ItemProps) =>
    <ListGroupItem className="item" >
        <div className="name">{name}</div>
        <div className="item-tail">
            <div className="value">{`$${value}`}</div>
            <Button className="delete-button" onClick={handleDeleteClick}>
                <Glyphicon glyph="trash" />
            </Button>
        </div>
    </ListGroupItem>;

export default Item;
