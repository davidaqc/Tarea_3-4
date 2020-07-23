import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: '',
      name: '',
      age: ''
    };
    this.create = this.create.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.loadAllUsers = this.loadAllUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  create(e) {
    e.preventDefault()

    const studentObject = {
      id: this.state.id,
      name: this.state.name,
      age: this.state.age
    };
    axios.post('http://localhost:8080/api/users', studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully created!')
      }).catch((error) => {
        console.log(error)
      })

    this.setState({ id: '', name: '', age: '' })
  }

  loadAllUsers(e) {
    e.preventDefault()

    axios.get('http://localhost:8080/api/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loadUser(e){
    e.preventDefault()

    axios.get('http://localhost:8080/api/users/' + this.state.id)
    .then(res => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        age: res.data.age
      });
      console.log('User successfully loaded!')
      console.log(res.data.name)
    })
    .catch((error) => {
      console.log(error);
    })
    
  }

  update(e) {
    e.preventDefault()

    const studentObject1 = {
      id: this.state.id,
      name: this.state.name,
      age: this.state.age
    };

    axios.patch('http://localhost:8080/api/users/' + this.state.id, studentObject1)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated!')
      }).catch((error) => {
        console.log(error)
      })

    this.setState({ id: '', name: '', age: '' })
  }

  delete(e) {
    e.preventDefault()

    axios.delete('http://localhost:8080/api/users/' + this.state.id)
    .then((res) => {
        console.log('User successfully deleted!')
    }).catch((error) => {
        console.log(error)
    })

    this.setState({ id: '', name: '', age: '' })
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Welcome!!!</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Add-Update-Delete Users</legend>
                <label htmlFor="id">
                  ID:
                  <input
                    name="id"
                    id="id"
                    type="text"
                    className="form-control"
                    value={this.state.id}
                    onChange={(e) => this.handleChange({ id: e.target.value })}
                    />
                </label>
                <label htmlFor="name">
                  Name:
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="age">
                  Age:
                  <input
                    name="age"
                    id="age"
                    type="text"
                    className="form-control"
                    value={this.state.age}
                    onChange={(e) => this.handleChange({ age: e.target.value })}
                    required
                    />
                </label>
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                    Add
                </button>
                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
                <button className="btn btn-danger1" type='button' onClick={(e) => this.loadUser(e)}>
                    Load User
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default App;