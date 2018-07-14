import React, { Component, Fragment } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    handleChange = e => {
        var target = e.target;
        var value = target.value;
        var name = target.name;
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var { keyword } = this.state;
        return (
            <Fragment>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa..."
                            name="keyword"
                            value={keyword}
                            onChange={this.handleChange}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                                <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                        </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Search;