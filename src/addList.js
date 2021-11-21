import { appendChildren,NewElementForClass } from './createNewElement';
import { addTodo, generateTodo } from "./addTodo";

const todoListArray = JSON.parse(localStorage.getItem('todoList')) || [];

function addTodoList(){    
    const TodoList = () => {
        const title = window.prompt('請輸入列表名稱');
        const todo = [];
        return {title,todo}
    }
    const newTodoList = TodoList();
    todoListArray.push(newTodoList); 
    localStorage.setItem('todoList',JSON.stringify(todoListArray));
    console.log(todoListArray.length);
    generateTodoList();
}

function generateTodoList(){
    todoListArray.forEach((element,i) => {
        if (!document.getElementById(`list${i}`)){
            const list = NewElementForClass(['todoList',`list${i}`]);        
            list.id = `list${i}`;          

            const listHead = (() => {
                const head = NewElementForClass(['head',`list${i}`]);

                const title = NewElementForClass(['name',`list${i}`]);
                title.innerHTML = element.title;
                title.addEventListener('click',_changeName)

                const addTodoBtn = NewElementForClass(['functionalBtn','addTodoBtn',`list${i}`]);
                addTodoBtn.innerHTML = '＋新建待辦事項';
                addTodoBtn.addEventListener('click',addTodo);
                
                appendChildren(head,[title,addTodoBtn]);
                return head
            })();

            const listBody = (() => {
                const body = NewElementForClass(['body',`list${i}`]);                              
                return body
            })();
            
            appendChildren(list,[listHead,listBody]);

            document.getElementById('todoBox').appendChild(list);
            generateTodo(element,list);  
        }
    });
}

function _changeName(e){
    const newContent = window.prompt('輸入新內容',e.target.innerHTML);
    e.target.innerHTML = newContent;     
    const classList = Array.from(e.target.classList);   
    if (classList.length === 2){
        todoListArray[classList[1].slice(4)].title = newContent;
    }
    else if (classList.length === 3 && !classList.indexOf('functionalBtn')){
        const listID = classList.slice(4);
        const todoID = classList.slice(4);
        const theKey = classList[0];
        todoListArray[listID].todo[todoID][theKey] = newContent;
    }            
    
    localStorage.setItem('todoList',JSON.stringify(todoListArray));    
}

export {addTodoList,generateTodoList};