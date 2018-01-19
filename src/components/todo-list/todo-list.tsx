import { Component, Prop, State } from '@stencil/core';
import { TodoItemModel } from '../../models/todo-item';

@Component({
    tag: 'todo-list',
    styleUrl: 'todo-list.scss'
})

export class MyComponent {

    @Prop() items: any[];
    @State() itemList: TodoItemModel[];

    private itemListEmpty: number[] = [];


    componentWillLoad() {
        this.itemList = (this.items)
            ? [... this.items.map((result, index) => result = { ...result, id: index })]
            : [];
    }

    componentDidUpdate() {
        console.log(this.itemList);
        console.log(this.itemListEmpty);
    }

    // item functions
    addTodo() {
        let item: TodoItemModel = {
            text: "", priority: "low", selected: false, id: this.itemList.length
        }
        this.itemList = [...this.itemList, item];
        this.addItemListEmpty(item.id);
    }
    addItemListEmpty(id: number) {
        this.itemListEmpty = [...this.itemListEmpty, id];
    }

    removeTodo(id: number){
        this.itemList = [... this.itemList
            .filter((item) => item.id !== id)
            .map((result, index) => result = {... result, id: index})
        ];
        this.updateEmptyList(id);
    }
    updateEmptyList(id: number){
        this.itemListEmpty = [...this.itemListEmpty.map((i) => id < i ? --i : i)];
    }

    handleInput(ev, id: number){
        let index = this.itemList.findIndex((item) => item.id === id);
        this.itemList[index].text = ev.target.value;
        this.itemList = [... this.itemList];
        if (ev.target.value === ""){
            this.addItemListEmpty(id);
        } else{
            this.removeItemListEmpty(id);
        }
    }
    removeItemListEmpty(id: number){
        this.itemListEmpty = [...this.itemListEmpty.filter((i) => i != id)];
    }

    changePriority(ev, id: number){
        let index = this.itemList.findIndex((item) => item.id === id);
        this.itemList[index].priority = ev.target.value;
        this.itemList = [... this.itemList];
    }

    lockTodo(ev, id: number){
        let index = this.itemList.findIndex((item) => item.id === id);
        this.itemList[index].selected = ev.target.checked;
        this.itemList = [... this.itemList];
    }


    render() {
        let todos = null;
        if (this.itemList && this.itemList.length > 0) {
            todos = this.itemList.map(
                (todo) =>
                    <div class={todo.priority}>

                        <input type="text" 
                            value={todo.text} 
                            disabled={todo.selected} 
                            style={{ textDecoration: todo.selected ? 'line-through' : 'none' }}
                            onInput={(ev) => this.handleInput(ev, todo.id)}                        
                        />

                        <button 
                            disabled={(todo.text.trim().length === 0)} 
                            onClick={() => this.removeTodo(todo.id)} >
                            &#10005;
                        </button>
                        
                        <select disabled={todo.selected} 
                            onChange={(ev) => this.changePriority(ev, todo.id)}>
                            <option disabled>Priority</option>
                            <option value="low" selected={todo.priority === "low"} >low</option>
                            <option value="middle" selected={todo.priority === "middle"} >middle</option>
                            <option value="high" selected={todo.priority === "high"}>high</option>
                        </select> 

                        <input 
                            type="checkbox" 
                            checked={todo.selected} 
                            disabled={todo.text.trim().length === 0}                        
                            onChange={(ev) => this.lockTodo(ev, todo.id)} 
                        />

                    </div>
            )
        }
        return (
            <div>
                {todos}
                <button
                    id="addBtn"
                    disabled={this.itemListEmpty.length > 0}
                    onClick={() => this.addTodo()}>
                    ADD
                </button>
            </div>
        );
    }
}