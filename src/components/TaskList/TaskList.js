import propTypes from 'prop-types';

import Task from '../Task';

const TaskList = ({ todos, onDelete, onChangeStatus, onChangeLabel }) => {
  const items = todos.map((item) => {
    const { id, label, done, display } = item;
    if (!display) return null;
    return (
      <Task
        label={label}
        key={id}
        done={done}
        onDelete={() => onDelete(id)}
        onChangeStatus={() => onChangeStatus(id)}
        onChangeLabel={(label) => onChangeLabel(id, label)}
      />
    );
  });

  return <ul className="todo-list">{items}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  onDelete: () => {},
  onChangeStatus: () => {},
  onChangeLabel: () => {},
};

TaskList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      done: propTypes.bool,
      display: propTypes.bool,
      id: propTypes.any,
    })
  ),
  onDelete: propTypes.func,
  onChangeStatus: propTypes.func,
  onChangeLabel: propTypes.func,
};

export default TaskList;
