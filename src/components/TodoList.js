import React, { Component } from 'react'
import TodoItem from './TodoItem';


export default class TodoList extends Component {
  
  render() {
    const {items,clearList,deleteItem,editItem} = this.props;
    return (
     <ul className="list-group my-5">
     <h3 className="text-capitalize text-center">todo list</h3>
     
      {items.map(item=>{
           return <TodoItem key ={item.id} 
           title={item.title}
           deleteItem ={()=> deleteItem(item.id)}
           editItem ={()=>editItem(item.id)}
           />;
      })}
      <button type="text"
       className="btn btn-block btn-danger text-center mt-5" 
       onClick ={clearList}>clear list</button>
     </ul>
    )
  }
}
