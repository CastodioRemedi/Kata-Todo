import { Component } from 'react';
import propTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    createTask: () => {},
  };

  static propTypes = {
    createTask: propTypes.func,
  };

  state = {
    taskLabel: '',
    min: '',
    sec: '',
  };

  LabelInputHandler = (e) => {
    this.setState({
      taskLabel: e.target.value,
    });
  };

  MinInputHandler = (e) => {
    this.setState({
      min: e.target.value.replace(/\D/g, ''),
    });
  };

  SecInputHandler = (e) => {
    this.setState({
      sec: e.target.value.replace(/\D/g, ''),
    });
  };

  formSubmitHandler = (e) => {
    e.preventDefault();
    const { taskLabel: t, min: m, sec: s } = this.state;
    if (t.trim().length !== 0 && m.trim().length !== 0 && s.trim().length !== 0) {
      this.props.createTask(t, m, s);
      this.setState({ taskLabel: '', min: '', sec: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.formSubmitHandler}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.taskLabel}
            onChange={this.LabelInputHandler}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={this.MinInputHandler}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={this.SecInputHandler}
          />
          <input type="submit" autoFocus="autofocus" style={{ display: 'none' }} />
        </form>
      </header>
    );
  }
}
