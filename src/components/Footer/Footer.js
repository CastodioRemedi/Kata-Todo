import propTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

const Footer = ({ count, clearDone, filter, currentFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter
        filter={(filterMode) => {
          filter(filterMode);
        }}
        currentFilter={currentFilter}
      />
      <button className="clear-completed" onClick={clearDone}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  count: undefined,
  filter: () => {},
  currentFilter: 'all',
  clearDone: () => {},
};

Footer.propTypes = {
  count: propTypes.number,
  filter: propTypes.func,
  currentFilter: propTypes.oneOf(['all', 'active', 'completed']),
  clearDone: propTypes.func,
};

export default Footer;
