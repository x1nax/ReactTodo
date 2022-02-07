import { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import './App.css';

export default class App extends Component {
  state = {
    items: [
      {
        value: 'Learn Js',
        id: 1,
        complited: false,
        isHidden: false,
        time: Date.now(),
      },
      {
        value: 'Learn React',
        id: 2,
        complited: false,
        isHidden: false,
        time: Date.now(),
      },
      {
        value: 'Get a job',
        id: 3,
        complited: false,
        isHidden: false,
        time: Date.now(),
      },
    ],
    maxID: 4,
    complitedMod: false,
    notModes: true,
  };

  isComplited = (id) => {
    const { items } = this.state;
    const { complitedMod } = this.state;
    const { notModes } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.complited = !item.complited;
        if (item.complited !== complitedMod && notModes === false) {
          item.isHidden = true;
        }
      }
      return item;
    });
    this.setState({ items });
  };

  onDelete = (id) => {
    let { items } = this.state;
    items = items.filter((item) => item.id !== id);
    this.setState({ items });
  };

  clearComplited = () => {
    let { items } = this.state;
    items = items.filter((item) => !item.complited);
    this.setState({ items });
  };

  complitedModOn = () => {
    const { items } = this.state;
    items.map((item) => {
      if (item.complited === false) {
        item.isHidden = true;
      } else item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: true });
    this.setState({ notModes: false });
    this.setState({ items });
  };

  activeModOn = () => {
    const { items } = this.state;
    items.map((item) => {
      if (item.complited === true) {
        item.isHidden = true;
      } else item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: false });
    this.setState({ notModes: false });
    this.setState({ items });
  };

  notModesOn = () => {
    const { items } = this.state;
    items.map((item) => {
      item.isHidden = false;
      return item;
    });
    this.setState({ complitedMod: false });
    this.setState({ notModes: true });
    this.setState({ items });
  };

  addTask = (label) => {
    let { maxID } = this.state;
    maxID++;
    const { complitedMod } = this.state;
    let { items } = this.state;
    items = [
      ...items,
      {
        value: label,
        id: maxID,
        complited: false,
        isHidden: complitedMod,
        time: Date.now(),
      },
    ];
    this.setState({ items });
    this.setState({ maxID });
  };

  onEdit = (newtask, id) => {
    const { items } = this.state;
    items.map((item) => {
      if (item.id === id) {
        item.value = newtask;
      }
      return item;
    });
    this.setState({ items });
  };

  render() {
    let { items: doneCount } = this.state;
    doneCount = doneCount.filter((item) => !item.complited).length;
    const { items } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList items={items} isComplited={this.isComplited} onDelete={this.onDelete} onEdit={this.onEdit} />
          <Footer
            complitedModOn={this.complitedModOn}
            activeModOn={this.activeModOn}
            notModesOn={this.notModesOn}
            doneCount={doneCount}
            clearComplited={this.clearComplited}
          />
        </section>
      </section>
    );
  }
}
