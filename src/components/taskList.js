import React, { Component } from 'react';
import TaskItems from './taskItems';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtername: '',
            filterstatus: -1
        }
    }
    handChange(e) {
        var { filtername, filterstatus } = this.state;
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filtername' ? value : filtername,
            name === 'filterstatus' ? value : filterstatus,
        );
        this.setState({
            [name]: value
        });
    }
    render() {
        var { tasks } = this.props;
        var { filtername, filterstatus } = this.state;
        var elmtasks = tasks.map((task, index) => {
            return <TaskItems
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onEdit={this.props.onEdit}
            />
        })
        return (
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" name="filtername" value={filtername} onChange={this.handChange.bind(this)} />
                        </td>
                        <td>
                            <select className="form-control" name="filterstatus" checked={filterstatus} onChange={this.handChange.bind(this)}>
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmtasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;
