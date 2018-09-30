import React, { Component } from 'react';
import axios from 'axios';

// TO-DO: Key would be accepted from some proper auth methods.
const token = 'ABCDEFG';

// TO-DO: URL would be defined in some sort of configuration file.
const url = 'http://localhost:8080';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: [''],
      results: [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const companies = this.state.search.filter(item => item !== '');

    this.setState({
      results: [],
      error: '',
    });

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        companies,
      }
    }).then(results => {
      this.setState({ results: results.data.data });
    }).catch(error => {
      if (error.response) {
        this.setState({
          error: (<p className="mt-3">{error.response.data}</p>)
        });
      }
    });
  }

  handleChange = (id) => (event) => {
    const search = this.state.search;
    search[id] = event.target.value;

    this.setState({ search });
  }

  handleAdd = () => {
    const search = this.state.search;

    if (search.length < 25) {
      search.push('');
    }

    this.setState({ search });
  }

  handleRemove = (id) => () => {
    const search = this.state.search;

    search.splice(id, 1);

    this.setState({ search });
  }

  // TO-DO: Split to multiple components.
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-3">
            <form onSubmit={this.handleSubmit}>
              {this.state.search.map((item, id) => (
                <div className="input-group mb-1" key={id}>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={item}
                    onChange={this.handleChange(id)}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary" onClick={this.handleRemove(id)}>x</button>
                  </div>
                </div>
              ))}

              <div className="mt-2">
                <input type="submit" className="btn btn-primary mr-3" />
                <button type="button" onClick={this.handleAdd} className="btn btn-secondary">Add Company</button>
              </div>
            </form>

            {this.state.error}
          </div>
          <div className="col-9">
            <ul>
              {this.state.results.map((item, id) => (
                <li key={id}>
                  {decodeURI(item.name)}
                  <a href={item.domain} target="_company" className="ml-3">{item.domain}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;