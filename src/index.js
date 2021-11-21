import {addTodoList,generateTodoList} from './addList';
import './style.css';
import {NewElement,appendChildren} from './createNewElement';
import { format } from 'date-fns';

function component(){
    const header = document.createElement('header');
    header.innerHTML = `今日日期：${format(new Date,'yyyy-MM-dd')}`;
    const main = (() => {
        const main = document.createElement('main');
        const sidebar = NewElement('sidebar');
        const content = NewElement('content');    
    
        const toolBar = (() => {
            const toolBar = NewElement('toolBar');
            const addTodoListBtn = document.createElement('div');
            addTodoListBtn.innerHTML = "＋新建列表";
            addTodoListBtn.classList.add('functionalBtn');
            addTodoListBtn.addEventListener('click',addTodoList);
            toolBar.appendChild(addTodoListBtn);
            return toolBar;
        })();       

        const todoBox = NewElement('todoBox');    

        appendChildren(content,[toolBar,todoBox]);
        appendChildren(main,[sidebar,content]);

        return main
    })();
    const footer = document.createElement('footer') 
    return [header,main,footer]
}

appendChildren(document.body,component())
generateTodoList();
