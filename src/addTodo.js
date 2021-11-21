import { NewElementForClass,appendChildren } from './createNewElement';

const todoListArray = JSON.parse(localStorage.getItem('todoList')) || [];

const Todo = (title,description,dueDate,priority,note) => {
    const checkbox = false;
    return {title,description,dueDate,priority,note,checkbox};
}

function addTodo(e){    
    const todoListArray = JSON.parse(localStorage.getItem('todoList'))
    const list = todoListArray[e.target.parentElement.parentElement.id.slice(4)];
    const title = window.prompt('請輸入待辦事項標題');
    const description = window.prompt('請輸入待辦事項描述');
    const dueDate = window.prompt('請輸入待辦事項期限:yyyy-dd-mm')
    const priority = window.prompt('優先級:H、M、L');
    const note = window.prompt('備註');
    const newThingTodo = Todo(title,description,dueDate,priority,note);    
    list.todo.push(newThingTodo);
    localStorage.setItem('todoList',JSON.stringify(todoListArray));
    generateTodo(list,e.target.parentElement.parentElement)
}

function generateTodo(todoListData,todoListWeb){
    todoListData.todo.forEach((v,i) => {
        if (!document.getElementById(`${todoListWeb.id}-${i}`)){
            const todo = NewElementForClass(['todo',`list${i}`]);
            todo.id = `${todoListWeb.id}-todo${i}`;
            appendChildren(todo,_createTodoDiv(v,i,todoListWeb.id));
            todoListWeb.childNodes[1].appendChild(todo);               
        }
    })
}

function _createTodoDiv(v,i,listID) {
    
    const [title,dueDate,priority,description,note] = 
    ['title','dueDate','priority','description','note'].map(x=>{
        const block = NewElementForClass([x,`todo${i}`,listID]);
        block.innerHTML = v[x];
        block.addEventListener('click',_changeContent);    
        return block        
    }) 
    const top = NewElementForClass(['top',`todo${i}`,listID]);    
    const checkbox = NewElementForClass(['checkbox','functionalBtn',`todo${i}`,listID]);
    checkbox.innerHTML = '';
    v.checklist ? checkbox.classList.add('hasDone') : null;
    checkbox.addEventListener('click',_hasDoneOrNot);
    appendChildren(top,[title,dueDate,priority,checkbox]);

    const foot = NewElementForClass(['foot',`todo${i}`,listID]);
    const deleteBtn = NewElementForClass(['deleteBtn','functionalBtn',`todo${i}`,listID]);
    deleteBtn.innerHTML = '刪除待辦事項'
    deleteBtn.addEventListener('click',_deleteTodo);
    appendChildren(foot,[note,deleteBtn]);
    return [top,description,foot];
}

function _hasDoneOrNot(e) {
    const classList = Array.from(e.target.classList); 
    const listID = classList[3].slice(4);
    const todoID = classList[2].slice(4);    
    todoListArray[listID].todo[todoID].checklist = e.target.classList.toggle('hasDone');
    return localStorage.setItem('todoList',JSON.stringify(todoListArray));    
}

function _changeContent(e) {        
    const classList = Array.from(e.target.classList); 
    const listID = classList[2].slice(4);
    const todoID = classList[1].slice(4);
    const theKey = classList[0];
    const newContent = window.prompt('輸入新內容',e.target.innerHTML);
    e.target.innerHTML = newContent; 
    todoListArray[listID].todo[todoID][theKey] = newContent;
    return localStorage.setItem('todoList',JSON.stringify(todoListArray));
}

function _deleteTodo(e) {
    const classList = Array.from(e.target.classList);    
    const todo = document.getElementById(`${classList[3]}-${classList[2]}`);
    if (window.confirm(`確定要刪除：${todo.firstChild.firstChild.innerHTML}？`)) {
        todo.remove();
        const listID = classList[3].slice(4);
        const todoID = classList[2].slice(4);
        todoListArray[listID].todo.splice(todoID,1);
        return localStorage.setItem('todoList',JSON.stringify(todoListArray));
    }

}

export {addTodo,generateTodo}