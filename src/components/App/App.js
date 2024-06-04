import { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const App = () => {
  const [todoData, setTodos] = useState([]);
  const [currentFilter, setFilter] = useState('all');

  const createTaskConfig = (label, min, sec) => {
    return {
      label,
      done: false,
      display: true,
      id: Date.now() + Math.random(), // Комбинация времени и случайного числа
      time: Number(min) * 60 + Number(sec),
    };
  };

  const changeTaskStatus = (id) => {
    setTodos((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const updatedItem = { ...todoData[index], done: !todoData[index].done };
      return [...todoData.slice(0, index), updatedItem, ...todoData.slice(index + 1)];
    });

    tasksFilter(currentFilter);
  };

  const changeTaskLabel = (id, newLabel) => {
    setTodos((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const updatedItem = { ...todoData[index], label: newLabel };
      return [...todoData.slice(0, index), updatedItem, ...todoData.slice(index + 1)];
    });
  };

  const createTask = (label, m, s) => {
    setTodos((todoData) => {
      return [createTaskConfig(label, m, s), ...todoData];
    });
  };

  const deleteTaskFromList = (id) => {
    setTodos((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, index), ...todoData.slice(index + 1)];
    });
  };

  const tasksFilter = (filterMode) => {
    setFilter(filterMode);

    setTodos((todoData) => {
      return todoData.map((task) => {
        let display = true;
        if (filterMode === 'active') display = !task.done;
        if (filterMode === 'completed') display = task.done;
        return { ...task, display: display };
      });
    });
  };

  const clearDone = () => {
    setTodos((todoData) => {
      return [...todoData.filter((el) => el.done === false)];
    });
  };

  return (
    <section className="todoapp">
      <NewTaskForm createTask={createTask} />
      <section className="main">
        <TaskList
          todos={todoData}
          onDelete={deleteTaskFromList}
          onChangeStatus={changeTaskStatus}
          onChangeLabel={changeTaskLabel}
        />
        <Footer
          count={todoData.filter((el) => el.done === false).length}
          filter={tasksFilter}
          currentFilter={currentFilter}
          clearDone={clearDone}
        />
      </section>
    </section>
  );
};

export default App;
