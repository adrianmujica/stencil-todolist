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
            text: `todo-item: ${this.itemList.length}`, priority: "low", selected: false, id: this.itemList.length
        }
        this.itemList = [...this.itemList, item];
        this.addItemListEmpty(item.id);
    }
    addItemListEmpty(id: number) {
        this.itemListEmpty = [...this.itemListEmpty, id];
    }


    render() {
        let todos = null;
        if (this.itemList && this.itemList.length > 0) {
            todos = this.itemList.map(
                (todo) =>
                    <div class={todo.priority}>
                        <label>{todo.text}</label>
                        <label class="disable" >&#10005;</label>
                    </div>
            )
        }
        return (
            <div>
                {todos}
                <button
                    onClick={() => this.addTodo()}>
                    ADD
                </button>
            </div>
        );
    }
}