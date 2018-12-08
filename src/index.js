import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; 
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function listItems(props){
    return(
        <div>
            {props.ul}
           
            </div>
    )
}

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
class TodoApp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:'',
            eindex:'0',
            isDone:false,
            items:[],
            input: '',
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.input = React.createRef();
        this.handleIframe = this.handleIframe.bind(this);
        this.updateIframe = this.updateIframe.bind(this);
        this.handleIframeChange = this.handleIframeChange.bind(this);
        this.dragmousedown = this.dragmousedown.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
     }

     componentDidMount() {
        // const element = document.getElementById('frame1').contentWindow.document;
        // element.body.addEventListener('click', (event) => {
        //     console.log('event', event);
        //  })
        //  console.log('didMount()', element);
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

    dragmousedown(e) {
        console.log('here here here');
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        // e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        // document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.getElementById('frame1').contentWindow.document.onmousemove = this.elementDrag;
        console.log('drag', e, 'ing',);
    }

    elementDrag(e) {
        // let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const local = document.getElementById('frame1').contentWindow.document.getElementsByTagName('h1');
        const elmnt = document.getElementById('frame1').contentWindow.document.getElementsByTagName('h1')[1];
        console.log('before elementDrag', local);
        // e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        console.log('after elementDrag', local);
    }

    handleIframe() {
        const local = document.getElementById('frame1').contentWindow.document.getElementsByTagName('h1');
        const doc = document.getElementById('frame1').contentWindow.document;
        console.log('iframe', doc);
        doc.body.addEventListener('mouseover', (event) => {
            console.log('event', event);
         })
         
        axios.get('https://cors-anywhere.herokuapp.com/https://www.marksandspencer.com/6ft-evergreen-tree-brights-bundle/p/p60208413?prevPage=plp&pdpredirect', {
            header: {
                'X-Requested-With': 'origin'
            }
        }).then(response => {
            doc.open()
            doc.write(response.data);
            doc.close();
        }).catch(error => console.log('error', error));
        const element = document.getElementById('frame1').contentWindow;
        console.log('handleIframe()', element);
       setTimeout(() => {
        const inspect = document.getElementById('frame1').contentWindow.document.getElementsByTagName('h1')[1];
        // inspect.onmousedown = this.dragmousedown;
        inspect.style.left = '300px';
        console.log('inspect', local);
       }, 15000);
    }

    updateIframe() {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.onchange = (event) => this.setState({ input: event.target.value })
        const res = document.getElementById('frame1').contentWindow.document.getElementsByClassName('product-header')[0];
        // res.innerHTML = input;
        res.replaceChild(input, res.childNodes[1]);
        console.log('res', res);
        const inspect = document.getElementById('frame1').contentWindow.document.getElementsByTagName('h1');
        console.log('inspect', inspect);
    }

    handleIframeChange() {
        const { input } = this.state;
        let elem = document.createElement('h1');
        elem.innerHTML = input;
        const res = document.getElementById('frame1').contentWindow.document.getElementsByClassName('product-header')[0];
        // res.innerHTML = input;
        res.replaceChild(elem, res.childNodes[1]);
        console.log('res', res);
    }

    render(){
        const { input } = this.state;
        var _style = "line-through";
            if(!this.state.isDone)
            _style ="none";
            console.log('this.state', input);
            input && input.length > 0 && this.handleIframeChange();
        return(
           <div id="q" align="center">
       
           <input type="text" ref={this.input} value={this.state.value} onChange={this.handleChange} placeholder="What's on your mind!" />
           <button  onClick={this.handleSubmit} >ADD</button>
                <ul >
               {this.state.items.map(function(todo,index,isDone) {
               return <li key={index} ><input type="checkbox" onChange={this.handleChecked.bind(this)} defaultChecked={this.state.isDone} /><span style={{"textDecoration": this._style}}>{todo}</span>&nbsp;&nbsp;<button onClick={this.edit.bind(this,todo,index)}>Edit</button>&nbsp;&nbsp;<button onClick={this.delete.bind(this, index)}>Delete</button></li>
                }.bind(this))}
             
             </ul>
             <button onClick={this.handleIframe}>Add to iframe</button> 
             <button onClick={this.updateIframe}>Update iframe</button>
             <div>
                <iframe src="" style={{ width: 800, height: 300}} id="frame1"></iframe>
             </div>
           </div>     
           
         
        );
    }
}


ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
  );
  