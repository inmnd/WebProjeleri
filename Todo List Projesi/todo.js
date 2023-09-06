// İlgili elementlerin seçimi
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){// Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}


function clearAllTodos(e){
    // Silme işlemi istemini doğrulama
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        // Önce arayüzden todo'lar kaldırılmalı
        
        // todoList.innerHTML = ""; Bu yöntem yavaş proje çok büyük değilse kullanımı mantıklıdır
        // null olana kadar ilk çocuğu silecek
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        // İkinci olarak local storage'dan silinmeli
        // local storage'dan islmek için key silinmesi yeterlidir
        localStorage.removeItem("todos");
    }
    
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1){// -1 bu değerin bulunmadığı anlamına gelir
            // görünüp görünmemesini sağlar
            listItem.setAttribute("style","display:none !important");
            // bootstrap'de bulunan bir özellik dolayısıyla !important kullanıldı
        }
        else{
            listItem.setAttribute("style","display: block");
        }
    })
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if(todo === deleteTodo){
            todos.splice(index,1);// O index'den itibaren bir değer sil demek
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi...");
    }
    
    e.preventDefault();
}
function getTodosFromStorage(){// Pek çok yerde kullanılacağı için bu şekilde fonksiyonlaştırıldı
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout(function,1000) süreli olarak bir işlemin geçerli olmasını sağlar
    setTimeout(function(){
        alert.remove();
    }, 1000);
}
function addTodoToUI(newTodo){// String değerini list item olarak UI'ya(arayüz) ekleyecek
    /*  Buradakine benzer bir element oluşturulmalı
        <li class="list-group-item d-flex justify-content-between">
                            Todo 1
            <a href = "#" class ="delete-item">
                <i class = "fa fa-remove"></i>
           </a>
        </li>
    */

   // List Item oluşturma
   const listItem = document.createElement("li");
   listItem.className = "list-group-item d-flex justify-content-between";

   // Link oluşturma
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";
   
   // Text Node ekleme
   listItem.appendChild(document.createTextNode(newTodo));

   // Çocukları ebeveynlere atama
   listItem.appendChild(link);
   todoList.appendChild(listItem);

   // Input'u temizleme
   todoInput.value = "";
}
