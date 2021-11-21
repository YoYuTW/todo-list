function NewElement(id){
    const newELe = document.createElement('div');
    newELe.id = id;
    return newELe
}

function NewElementForClass(classname){
    const newELe = document.createElement('div');
    if (Array.isArray(classname)){
        classname.forEach(v => {
            newELe.classList.add(v);
        })
    }
    else {newELe.classList.add(classname);}    
    return newELe
}

function appendChildren(parent,children){
    if (Array.isArray(children)){
        children.forEach(v => {
            parent.appendChild(v)
        })
    }
}

export {NewElement,appendChildren,NewElementForClass}