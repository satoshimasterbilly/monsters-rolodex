import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'
import './App.css';

class App extends Component {
   constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
    console.log('constructor')
}

componentDidMount() {
  
  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) =>
  this.setState(
    () => {
      return { monsters: users };
    })
  );
}
//optimization add to component to allow run over and over
onSearchChange = (event) => { 
  const searchField = event.target.value.toLocaleLowerCase();
  this.setState(() => {
      return { searchField };
    }); 
}

render() {
 
//optimization destructuring 'this'
  const { monsters, searchField } = this.state;
  const { onSearchChange } = this;

  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
   });
   
   return (
      <div className='App'>
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox 
        classname='search-box'
        onChangeHandler={onSearchChange} 
        placeholder= 'search monsters' 
        />
        <CardList monsters= { filteredMonsters }  />
      </div>
    );
  }
}

export default App;



