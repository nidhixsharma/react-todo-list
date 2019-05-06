import React, { Component } from 'react'
import TodoItem from './TodoItem';
export default class TodoList extends Component {    
     
  render() {
    const {items,clearList,editItem,deleteItem} = this.props;    
    console.log(items);
     
    return (
     <ul className="list-group my-5">
     <h3 className="text-capitalize text-center">todo list</h3>
     
      {items.map(item=>{
      return(<TodoItem key={item._id} 
      text={item.text}
      deleteItem ={()=> deleteItem(item._id)}
      editItem ={()=> editItem(item._id)}   
      />);
      })}    


      <button type="text"
       className="btn btn-block btn-danger text-center mt-5" 
       onClick ={clearList}>clear list</button>
     </ul>
    )
  }
}
