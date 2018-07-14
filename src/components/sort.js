import React, { Component, Fragment } from 'react';
import { MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';

class Sort extends Component {

    onClick = (sortBy, sortValue) => {

        this.props.onSort(sortBy, sortValue);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {

        return (
            <Fragment>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    <ButtonToolbar>
                        <DropdownButton
                            bsStyle="primary"
                            title="Sắp xếp"
                            id="dropdown-size-large"

                        >
                            <MenuItem eventKey="1" onClick={() => this.onClick('name', 1)} className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort-selected' : ''} >Tên A-Z</MenuItem>
                            <MenuItem eventKey="2" onClick={() => this.onClick('name', -1)} className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort-selected' : ''}  >Tên Z-A</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="3" onClick={() => this.onClick('status', 1)} className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort-selected' : ''} >Trạng Thái Kích Hoạt</MenuItem>
                            <MenuItem eventKey="3" onClick={() => this.onClick('status', -1)} className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort-selected' : ''} >Trạng Thái Ẩn</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </div>
            </Fragment >
        );
    }
}

export default Sort;
