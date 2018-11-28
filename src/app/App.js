import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        console.log(this.state);
        e.preventDefault();
    }

    handleChange(e) {
        console.log(e); //Continuar acá
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
                                                <input type="text" placeholder="Task title" name="title" onChange={this.handleChange}  />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" placeholder="Task description" onChange={this.handleChange} name="description"></textarea>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;