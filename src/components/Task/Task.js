import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import TaskTimer from '../TaskTimer';

const Task = ({ label, done, created, time, display, onChangeStatus, onDelete, onChangeLabel }) => {
  const [edited, changeEdited] = useState(false);
  const [createdFormat, setCreatedFormat] = useState(formatDistanceToNow(created, { includeSeconds: true }));
  const [newLabel, setNewLabel] = useState(label);

  useEffect(() => {
    let timer = setInterval(() => setCreatedFormat(formatDistanceToNow(created, { includeSeconds: true })), 1000);
    return () => clearTimeout(timer);
  }, []);

  const changeLabel = (e) => {
    if (e.key === 'Enter') {
      onChangeLabel(e.target.value);
      changeEdited(false);
    }
  };

  const enableEdit = () => {
    changeEdited(true);
  };

  let classNames = '';
  classNames += !display ? 'hidden' : '';
  classNames += done ? ' completed' : '';
  classNames += edited ? ' editing' : '';

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onChangeStatus} checked={done} readOnly />
        <label>
          <span className="title">{label}</span>
          <TaskTimer seconds={time} />
          <span className="description">{`created ${createdFormat} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={enableEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      <input
        type="text"
        className="edit"
        value={newLabel}
        onInput={(e) => {
          setNewLabel(e.target.value);
        }}
        onKeyDown={changeLabel}
      ></input>
    </li>
  );
};

Task.defaultProps = {
  label: undefined,
  done: false,
  created: new Date(),
  time: null,
  display: true,
  onChangeStatus: () => {},
  onDelete: () => {},
  onChangeLabel: () => {},
};
Task.propTypes = {
  label: propTypes.string.isRequired,
  done: propTypes.bool,
  created: propTypes.instanceOf(Date),
  time: propTypes.number,
  display: propTypes.bool,
  onChangeStatus: propTypes.func,
  onDelete: propTypes.func,
  onChangeLabel: propTypes.func,
};

export default Task;
