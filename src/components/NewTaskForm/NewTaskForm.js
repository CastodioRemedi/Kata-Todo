import { useState } from 'react';
import propTypes from 'prop-types';

const NewTaskForm = ({ createTask }) => {
  const [taskLabel, setTaskLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const LabelInputHandler = (e) => {
    setTaskLabel(e.target.value);
  };

  const MinInputHandler = (e) => {
    setMin(e.target.value.replace(/\D/g, ''));
  };

  const SecInputHandler = (e) => {
    setSec(e.target.value.replace(/\D/g, ''));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (taskLabel.trim().length !== 0 && min.trim().length !== 0 && sec.trim().length !== 0) {
      createTask(taskLabel, min, sec);
      setTaskLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={formSubmitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={taskLabel}
          onChange={LabelInputHandler}
        />
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={MinInputHandler} />
        <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={SecInputHandler} />
        <input type="submit" autoFocus="autofocus" style={{ display: 'none' }} />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  createTask: () => {},
};
NewTaskForm.propTypes = {
  createTask: propTypes.func,
};

export default NewTaskForm;
