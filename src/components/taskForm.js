import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    // componentWillMount() {
    //     if (this.props.task) {
    //         this.setState({
    //             id: this.props.task.id,
    //             name: this.props.task.name,
    //             status: this.props.task.status,
    //         });
    //         console.log(this.state);
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            });
            console.log(this.state);
        }
    }
    onClose() {
        this.props.onCloseForm();
    }
    handChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }
    handSubmit(e) {
        e.preventDefault();
        this.props.handSubmit(this.state);
        this.onClear();
        this.onClose();
    }
    onClear() {
        this.setState({
            name: '',
            status: false
        })
        this.onClose();
    }
    render() {
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title text-left">
                        {id === '' ? 'Thêm Công Việc' : 'Chỉnh Sửa Công Việc'}
                        <span className="fa fa-times-circle text-right" onClick={this.onClose.bind(this)}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.handChange.bind(this)}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control"
                            name='status'
                            value={this.state.status}
                            onChange={this.handChange.bind(this)}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" >Lưu Lại</button>&nbsp;
                                <button className="btn btn-danger" onClick={this.onClear.bind(this)}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
