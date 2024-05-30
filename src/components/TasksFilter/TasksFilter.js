import propTypes from 'prop-types';

const TasksFilter = ({ filter, currentFilter }) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={currentFilter === 'all' ? 'selected' : ''}
          onClick={() => {
            filter('all');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={currentFilter === 'active' ? 'selected' : ''}
          onClick={() => {
            filter('active');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={currentFilter === 'completed' ? 'selected' : ''}
          onClick={() => {
            filter('completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  filter: () => {},
  currentFilter: 'all',
};

TasksFilter.propTypes = {
  filter: propTypes.func,
  currentFilter: propTypes.oneOf(['all', 'active', 'completed']),
};

export default TasksFilter;
