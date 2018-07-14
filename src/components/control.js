import React, { Component, Fragment } from 'react';
import Search from './search';
import Sort from './sort';

class Control extends Component {
    render() {
        return (
            <Fragment>
                <Search onSearch={this.props.onSearch} />
                <Sort
                    onSort={this.props.onSort}
                    sortBy={this.props.sortBy}
                    sortValue={this.props.sortValue}
                />
            </Fragment>
        );
    }
}

export default Control;
