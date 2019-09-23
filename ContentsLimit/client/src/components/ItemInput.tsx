import * as React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import '../css/ItemInput.css';

export interface ItemInputProps {
    handleAdd: any;
}

class ItemInput extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            category: '',
            name: '',
            value: 0,
        }
        this.handleAddClick = this.handleAddClick.bind(this);
        this.assignCategoryInputRef = this.assignCategoryInputRef.bind(this);
        this.assignNameInputRef = this.assignNameInputRef.bind(this);
        this.assignValueInputRef = this.assignValueInputRef.bind(this);
    }
    public render() {
        return (
            <Form className="item-input">
                <FormGroup className="item-name">
                    <ControlLabel>Item Name</ControlLabel>
                    <FormControl
                        id="name"
                        type="text"
                        placeholder="TV"
                        inputRef={this.assignNameInputRef}
                    />
                </FormGroup>
                <FormGroup className="item-value">
                    <ControlLabel>Value</ControlLabel>
                    <FormControl
                        id="value"
                        type="number"
                        placeholder="$400"
                        inputRef={this.assignValueInputRef}
                    />
                </FormGroup>
                <FormGroup className="item-category">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        inputRef={this.assignCategoryInputRef}
                    >
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Misc">Misc</option>
                    </FormControl>
                </FormGroup>
                <Button className="add-button" bsStyle="primary" onClick={this.handleAddClick}>
                    {'Add'}
                </ Button>
            </Form>
        );
    }
    private assignNameInputRef(nameInputRef: any) {
        this.setState({nameInputRef});
    }
    private assignValueInputRef(valueInputRef: any) {
        this.setState({valueInputRef});
    }
    private assignCategoryInputRef(categoryInputRef: any) {
        this.setState({categoryInputRef});
    }
    private handleAddClick() {
        const {nameInputRef, valueInputRef, categoryInputRef} = this.state;
        this.props.handleAdd(nameInputRef.value, parseFloat(valueInputRef.value), categoryInputRef.value);
    }
}

export default ItemInput;
