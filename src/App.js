import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'uuid';
class App extends Component {
  state ={
    items :[],  
    id:uuid(),
    item:"",
    editItem :false
  };

  handleChangeInput =(e)=>{
    this.setState({
      item:e.target.value
    });
  };

  handleSubmit =(e)=>{
  e.preventDefault();

  const newItem = {
    id:this.state.id,
    title:this.state.item
  }
  const updatedItems = [...this.state.items,newItem];
  this.setState({
    items:updatedItems,
    item:" ",
    id:uuid(),
    editItem:false

  })
  };

  handleClearList =()=>{
    this.setState({
      items:[]
    })
  }

  handleDeleteItem=(id)=>{
    const filteredItems =this.state.items.filter(item=>
      item.id!==id )
      this.setState({
        items:filteredItems
      });
  };

  handleEditItem=(id)=>{

    const filteredItems = this.state.items.filter(item=>
      item.id!==id)
     
      const selectedItem= this.state.items.find(item=>item.id===id);
      console.log(selectedItem);
      this.setState({
        items:filteredItems,
        item:selectedItem.title,
        editItem:true,
        id:id
      
      });
  };
  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto col-md-8 mt-4">
        <h3 className ="text-capitalize text-center">Todo input</h3>
       
        <TodoInput item ={this.state.item} 
        changeInput = {this.handleChangeInput}
         handleSubmit = {this.handleSubmit}
         editItem ={this.state.editItem}
         />
        <TodoList items ={this.state.items} 
        clearList={this.handleClearList}
        deleteItem ={this.handleDeleteItem}
        editItem={this.handleEditItem}
         />
        </div>
      </div>
    </div>
      
       );
  }
}

export default App;


