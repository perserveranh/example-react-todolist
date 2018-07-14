import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control';
import TaskList from './components/taskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isOpen: false,

      taskEditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }
  handGeneratedta() {
    const uuidv4 = require('uuid/v4');
    var tasks = [
      {
        id: uuidv4(),
        name: 'Học lập trình ',
        status: true
      },
      {
        id: uuidv4(),
        name: 'Du lịch',
        status: false
      },
      {
        id: uuidv4(),
        name: 'abc',
        status: false
      }
    ]

    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onToggleForm() {
    this.setState({
      isOpen: true,
      taskEditting: null
    })
  }
  onCloseForm() {
    this.setState({
      isOpen: false
    })
  }
  onShowForm() {
    this.setState({
      isOpen: true
    })
  }
  onSubmit(data) {
    var { tasks } = this.state;
    const uuidv4 = require('uuid/v4');
    if (data.id === '') {
      data.id = uuidv4();
      tasks.push(data);
    }
    else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditting: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

  }
  onUpdateStatus(id) {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onDelete(id) {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }
  onEdit(id) {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    })
    this.onShowForm();
  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((tasks, index) => {
      if (tasks.id === id) {
        result = index;
      }
    })
    return result;
  }

  onFilter = (filtername, filterstatus) => {
    filterstatus = parseInt(filterstatus, 10);
    this.setState({
      filter: {
        name: filtername.toLowerCase(),
        status: filterstatus
      }
    });
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });

  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
    console.log(this.state);
  }

  render() {
    var { tasks, isOpen, taskEditting, filter, keyword, sortBy, sortValue } = this.state;
    // Filter
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task
        }
        else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }

    // Keyword
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      });
    }

    var elmTaskform = isOpen ? <TaskForm
      handSubmit={this.onSubmit.bind(this)}
      onCloseForm={this.onCloseForm.bind(this)}
      task={taskEditting}
    /> : '';

    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return - sortValue;
        else return 0;
      });
    }
    else {
      tasks.sort((a, b) => {
        if (a.status < b.status) return sortValue;
        else if (a.status > b.status) return - sortValue;
        else return 0;
      });
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isOpen ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmTaskform}
          </div>
          <div className={isOpen ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm.bind(this)}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
            <button type="button" className="btn btn-primary ml-5" onClick={this.handGeneratedta.bind(this)}>
              Generate Data
                </button>
            <div className="row mt-15">
              <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
                sortBy={sortBy}
                sortValue={sortValue}
              />
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus.bind(this)}
                  onDelete={this.onDelete.bind(this)}
                  onEdit={this.onEdit.bind(this)}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
