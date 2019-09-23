import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';
import ItemsList from './components/ItemsList';
import ItemInputContainer from './containers/ItemInputContainer';
import './css/App.css';
import { ItemList } from "./models/ItemsStore";


const itemList = ItemList.create()

class App extends React.PureComponent {
  public render() {
    fetch('https://localhost:5001/api/contentLimitItems/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET' 
    })
    .then(response => response.json())
    .then(records => {
        (records as any[]).forEach(record => {
            itemList.add(record, record.category)
        });
    });
    return (
      <Jumbotron className="App">
        <ItemsList itemList={itemList} />
        <ItemInputContainer itemList={itemList} />
      </Jumbotron>
    );
  }
}

export default App;
