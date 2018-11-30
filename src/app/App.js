import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            task: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e) {
        if(this.state._id) {
            fetch('/api/task/'+this.state._id, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task updated'});
                this.setState({title: '', description: '', _id:''});
                this.fetchTask();
            })
        } else {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }) //sirve para enviar una peticion HTTP al servidor
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task saved'});
                this.setState({title: '', description: '', _id:''});
                this.fetchTask();
            })
            .catch(err => console.log(err));
            e.preventDefault();
        }

        
    }

    componentDidMount() {
        this.fetchTask();
    }

    fetchTask() {
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({task: data});
                console.log(this.state.task);
            })
            .catch(err => console.log(err));
    }

    deleteTask(id) {
        if(confirm('Are you sure do you want to delete it?')){
            fetch('/api/task/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task deleted'});
                this.fetchTask();
            })
        }
    }

    editTask(id) {
        fetch(`/api/task/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
        })
            
            
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name] : value,
        })
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="">MERN STACK</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Task title" name="title" onChange={this.handleChange} value={this.state.title}  />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" placeholder="Task description" onChange={this.handleChange} name="description" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.task.map(t => {
                                            return (
                                                <tr key={t._id}>
                                                    <td>{t.title}</td>
                                                    <td>{t.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.editTask(t._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-red darken-4" onClick={() => this.deleteTask(t._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;