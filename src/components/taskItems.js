import React, { Component } from 'react';

class TaskItems extends Component {
    onUpdateStatus() {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete() {
        this.props.onDelete(this.props.task.id);
    }
    onEdit() {
        this.props.onEdit(this.props.task.id);
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status === true ? 'label label-success' : 'label label-primary'} style={{ cursor: 'pointer' }} onClick={this.onUpdateStatus.bind(this)}>
                        {task.status === true ? 'kích hoạt' : 'ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEdit.bind(this)}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                                        </button>
                    &nbsp;
                                        <button type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                                        </button>
                </td>
            </tr>
        );
    }
}

export default TaskItems;
