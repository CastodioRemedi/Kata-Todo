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
  };

  inputHandler = (e) => {
    this.setState({
      taskLabel: e.target.value,
    });
  };

  keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      if (this.state.taskLabel && this.state.taskLabel.trim().length !== 0) {
        this.props.createTask(this.state.taskLabel);
        this.setState({ taskLabel: '' });
      }
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.taskLabel}
          onChange={this.inputHandler}
          onKeyDown={this.keyPressHandler}
        />
      </header>
    );
  }
}
