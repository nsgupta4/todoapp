import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function listItems(props){
    return(
        <div>
            {props.ul}
           
            </div>
    )
}

class TodoApp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:'',
            eindex:'0',
            isDone:false,
            items:[],
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.input = React.createRef();
     }
     
    handleChange(event){
       // const items=this.state.items.slice();
       // items.push(this.state.value);
       this.setState({
           value:event.target.value,
         //  isDone:event.target.checked,
       });
       
}
handleChecked(event){
    this.setState({
        isDone:event.target.checked,
    });
    
}
edit(todo,index){
   // debugger;
    this.setState({value:todo,eindex:index});
}
delete(index){
    const items=[...this.state.items];
    items.splice(index, 1);
    this.setState({items:items});
}
    handleSubmit(event){
     const items =[...this.state.items];
     if(this.state.eindex){
         items[this.state.eindex]=this.state.value;
         this.setState({eindex:0});
     }else{
     items.push(this.state.value);
   
       }  this.setState({
           items:items,
           value:''
        });
     event.preventDefault();



    }
    render(){
        var _style = "line-through";
            if(!this.state.isDone)
            _style ="none";
        return(
           <div id="q" align="center">
       
           <input type="text" ref={this.input} value={this.state.value} onChange={this.handleChange} placeholder="What's on your mind!" />
           <button  onClick={this.handleSubmit} >ADD</button>
          
                <ul >
               {this.state.items.map(function(todo,index,isDone) {
               return <li key={index} ><input type="checkbox" onChange={this.handleChecked.bind(this)} defaultChecked={this.state.isDone} /><span style={{"textDecoration": this._style}}>{todo}</span>&nbsp;&nbsp;<button onClick={this.edit.bind(this,todo,index)}>Edit</button>&nbsp;&nbsp;<button onClick={this.delete.bind(this, index)}>Delete</button></li>
                }.bind(this))}
             
             </ul>
            
           </div>     
           
         
        );
    }
}


ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
  );
  