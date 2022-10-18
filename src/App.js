import './App.scss';
import { TodoList } from './TodoList';
import { useState, useEffect } from 'react';
import { AiTwotoneSave } from 'react-icons/ai';
import cancel from './images/cancel.svg';
import sun from './images/sun.svg';
import moon from './images/moon.svg';
function App() {

  const [dark, setDark] = useState(false);
  const [writeTodo, setWriteTodo] = useState({
    write:'',
    items:0,
    dark:false,
    checked:false,
  })

  useEffect(() => {

    const inputValue = document.getElementsByClassName('text')[0];
    const saveBtn =  document.getElementsByClassName('save')[0];

    function saveTodoList(){

      //if nothing is being save on my local storage, save an array
      if(localStorage.getItem('myTodoList')===null){
        localStorage.setItem('myTodoList','[]');
      }

      //get old value and slap it with new value
      const oldList = JSON.parse(localStorage.getItem('myTodoList')); 

      //if input value is not empty or equal space, update write  to input value,push to the storage and update items 
      //to storage length
      if(inputValue.value ==='' || inputValue.value ===' '){

      }else{
        writeTodo['write']=inputValue.value;
        oldList.push(writeTodo); 
        writeTodo['items']=oldList.length;   
      }
    
      
      //save old and new value to local storage
      localStorage.setItem('myTodoList', JSON.stringify(oldList));
      const store = JSON.parse( localStorage.getItem('myTodoList'));

      function showLists(){
      
        let output ='';
        const backGroundDiv = document.querySelector('.listTodos');

        //loop through my storage and append the html and the input value to the output
        store.forEach((data) => { 
             
          output+= `<div class='container'>
                        <div class='flexIt'>
                          <div><input type='checkbox' class='saveCheck'></div>                           
                          <div><p class='paraTodo'>${data.write}</p></div>   
                        </div>
                        <div class='cancel'><img src=${cancel} alt='logo'/></div>
                      </div>
                    `                          
        });

        //append the html div to the inner html of the background div
        backGroundDiv.innerHTML=output;
        const cancelTodo = backGroundDiv.getElementsByClassName('cancel');
        const containerDiv = document.getElementsByClassName('container');
        let todoInputs = document.getElementsByClassName('saveCheck');
        const paragaraph = document.getElementsByClassName('paraTodo');
        const clearAll = document.getElementsByClassName('clearCompleted');
 

        setWriteTodo((callback)=>({...callback,items:oldList.length}));

        for(let i=0; i<cancelTodo.length; i++){

          //delete each todo list from the local storagee and from display
          cancelTodo[i].onclick=()=>{
            store.splice(i,1);
            localStorage.setItem('myTodoList', JSON.stringify(store)); 
            containerDiv[i].style.display='none';             
            setWriteTodo((callback)=>({...callback,items:store.length}))
            saveTodoList();       
          }

          //clear both my local storage and my todo list display
          // eslint-disable-next-line 
          clearAll[0].onclick=()=>{
            store.splice(0,todoInputs.length)
            localStorage.setItem('myTodoList', JSON.stringify(store)); 
            todoInputs=[];
            saveTodoList();
          } 
           
        }
        for(let i=0; i<todoInputs.length; i++){

        // eslint-disable-next-line 
          todoInputs[i].onclick=()=>{
            if(todoInputs[i].checked){
              //change checked in the storage to true and update storage
              oldList[i]['checked']=true;
              paragaraph[i].style.textDecoration='line-through';
              paragaraph[i].style.color='grey';
              localStorage.setItem('myTodoList', JSON.stringify(oldList));
              
            }else{
              oldList[i]['checked']=false;
              paragaraph[i].style.textDecoration='none';
              paragaraph[i].style.color='white';
              localStorage.setItem('myTodoList', JSON.stringify(oldList));
            }
          } 
          
          //if checked in storage ===false slash and grey
          if (oldList[i]['checked']===false){
            todoInputs[i].checked=false;
            paragaraph[i].style.textDecoration='none';
            paragaraph[i].style.color='white';
          }else{
            todoInputs[i].checked=true;
            paragaraph[i].style.textDecoration='line-through';
            paragaraph[i].style.color='grey';
          }

        }

          //Change background color 
          const moon = document.getElementsByClassName('night')[0];
          moon.onclick=()=>{
            setDark(!dark);
            if(dark===false){
              const a = document.getElementById('App-header');
              a.setAttribute('class', 'lightBg');
              document.getElementsByClassName('night')[0].style.display='none';
              document.getElementsByClassName('toggle')[0].style.display='flex';
              document.getElementsByClassName('developer')[0].style.color='#3e4450';
              document.getElementsByClassName('listTodos')[0].style.backgroundColor='white';
              console.log(dark)
            }
          }

          const day = document.getElementsByClassName('toggle')[0];
          day.onclick=()=>{
            setDark(!dark);
            const a = document.getElementById('App-header');
              a.setAttribute('class', 'App-header');
              document.getElementsByClassName('night')[0].style.display='flex';
              document.getElementsByClassName('toggle')[0].style.display='none';
              document.getElementsByClassName('developer')[0].style.color='white';
              document.getElementsByClassName('listTodos')[0].style.backgroundColor='grey'
          }

        }
        //calling the showLists function
        showLists();    
        
        //Clear my input after each todo has been inputed and saved
        setWriteTodo((callback)=>({...callback,write:''}))
      }
    //Perform the whole function when the save icon is clicked
    saveBtn.onclick=saveTodoList;

    //Perform or call the whole function when the enter keyboard is pressed.
    document.addEventListener('keydown',(e)=>{
      if(e.key=== 'Enter'){   
        saveTodoList();
      }
    })
    //call the whole function the first time it mount to initialize the empty array
    saveTodoList();
    // eslint-disable-next-line
  },[])

  //control the input 
  const handleChange =(event)=>{
    setWriteTodo((callback)=>({...callback,write:event.target.value}));
  }
 
  return (
    <div className="App-header" id='App-header'>

      <div className='dayAndNight'>
        <div>
        <h1>TODO</h1>
        </div>        
        <div className='toggle'>
          <img src={sun} alt='Day'/>
        </div>
        <div className='night'>
          <img src={moon} alt='Night'/>
        </div>
      </div>

      <div className='inputTodo'>
        <input type='text' className='text' placeholder='Create a new todo ...' value={writeTodo.write} onChange={handleChange}/>
        <AiTwotoneSave className='save'/>
      </div>

      <div className='listTodos'/>
      <TodoList left={`${writeTodo.items} item(s)`} /> 
      <div className='developer'>&copy;Temz</div>
    </div>
  );
}

export default App;
