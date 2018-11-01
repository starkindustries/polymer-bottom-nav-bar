import {LitElement, html} from '@polymer/lit-element';
import './add-item'
import './list-items'

class TodoApp extends LitElement {
  static get properties() {
    return {
      todoList: Array
    }
  }

  constructor() {
    super();
    let list = JSON.parse(localStorage.getItem('todo-list'));
    this.todoList = (list === null ? [] : list);
  }

  _firstRendered() {
    this.addEventListener('addItem', (event) => {
      this.todoList = event.detail.todoList;
    })
    this.addEventListener('removeItem', (event) => {
      let index = this.todoList.map( function(item) {return item.id}).indexOf(event.detail.itemId);
      this.todoList.splice(index, 1);
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    })
    this.addEventListener('changeItem', (event) => {
      let index = this.todoList.map( function(item) {return item.id}).indexOf(event.detail.itemId);
      this.todoList[index].done = !this.todoList[index].done;
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    })
  }

  _render({todoList}) {
    return html`      
      <add-item></add-item>
      <list-items todoList=${todoList}></list-items>
    `;
  }
}

customElements.define('todo-app', TodoApp);
