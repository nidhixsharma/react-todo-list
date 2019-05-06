import React, { Component } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state ={
    items :[],  
    item:"",
    editItem :false,
    loading:false
  };

  componentDidMount(){
    axios.get('https://murmuring-fjord-22708.herokuapp.com/todos')
    .then(response=>{
     console.log(response.data.todos);
     let data = response.data.todos;
     this.setState({
       items:data});
    })
    .catch(error =>{
      console.log(error, 'something went wrong');
    });
  }

  handleChangeInput =(e)=>{
    this.setState({
      item:e.target.value
    });
    };

  handleSubmit =(e)=>{
  e.preventDefault();

  const newItem = {
    text:this.state.item
  };

  axios.post('https://murmuring-fjord-22708.herokuapp.com/todos',
     newItem) 
  .then(response=>{  
    const updatedItems = [...this.state.items,newItem];
    this.setState({
      items:updatedItems,
      item:" ",
      editItem:false     
    });
    console.log(response,'TodoItem Added');  
  })
  .catch(err=>{
    console.log(err,'Todo Item not Added. try again');
  });  
  
   };

   handleClearList =()=>{   
    axios.delete('https://murmuring-fjord-22708.herokuapp.com/todos')
    .then(response=>{
      let data = response.data.todos;
      console.log(data);
      this.setState({
        items:[]
      });
      console.log('List cleared');      
    }).catch(error=>{
    console.log('Unable to clear List');
    });
   
  };


  handleDeleteItem=(id)=>{

    console.log('Items available to delete' ,this.state.items);
    console.log(id);

       axios.delete(`https://murmuring-fjord-22708.herokuapp.com/todos/${id}`)
    .then(response=>{
      console.log('TodoItem Deleted',response.data);
      const filteredItems =this.state.items.filter(item=>
      item._id!==id )
      this.setState({
      items:filteredItems
      //loading:false
          });
      })
    .catch(error =>{
      console.log(error, 'something went wrong');
    });
  
        
  };


  // handleEditItem=(id)=>{

  //   const filteredItems = this.state.items.filter(item=>
  //     item.id!==id)
     
  //     const selectedItem= this.state.items.find(item=>item.id===id);
  //     console.log(selectedItem);
  //     this.setState({
  //       items:filteredItems,
  //       item:selectedItem.title,
  //       editItem:true,
  //       id:id
      
  //     });
  // };
  handleEditItem=(id)=>{
    const filteredItems = this.state.items.filter(item=>
          item._id!==id)
    const selectedItem= this.state.items.find(item=>item._id===id);
     console.log('Item to Update' ,selectedItem);
  const newItem = {     
      text:this.state.item
    } 
     axios.patch('https://murmuring-fjord-22708.herokuapp.com/todos/' +id,newItem)
           .then(response=>{
           console.log(response,'TodoItem Updated');
           console.log('Response Config',response.config);
           this.setState({
                  items:filteredItems,
                  item:selectedItem.text,
                  editItem:true,
                  id:id                
                });
           }).catch(error=>{
             console.log('Unable to Update');
           })
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


