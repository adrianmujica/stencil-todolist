import { Component } from '@stencil/core';


@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  render() {
    return (
      <div>
        <header>
          <h1>Stencil Todo List</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route url='/' component='todo-list' exact={true}>
            </stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
