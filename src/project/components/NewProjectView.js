import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './NewProjectView.css';

import createProject from '../../queries/createProject';

class NewProjectView extends Component {
    constructor({ match }) {
        super();
        this.state = {
            collectionId: match.params.id,
            tasks: [],
            addingTask: false,
            name: '',
            description: '',
            taskName: '',
            taskDescription: '',
            redirect: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleAddTaskForm = this.toggleAddTaskForm.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    async submitForm(event) {
        event.preventDefault();
        if (!this.state.name) {
            alert('Please enter a name for your project');
        }
        const {collectionId, name, description, tasks} = this.state;
        const response = await fetch('/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createProject({collectionId, name, description, tasks}))
        });
        const json = await response.json();
        this.setState({
            redirect: true
        });
    }

    async onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    toggleAddTaskForm() {
        this.setState({
            addingTask: !this.state.addingTask
        });
    }

    saveTask() {
        if (!this.state.taskName) {
            alert('You need a task name');
        }
        const tasks = this.state.tasks;
        tasks.push({
            name: this.state.taskName,
            description: this.state.taskDescription,
            dueDate: this.state.taskDueDate,
            type: this.state.taskType
        })
        this.setState({
            tasks: tasks,
            taskName: '',
            taskDescription: '',
            taskDueDate: '',
            taskType: ''
        });
        this.toggleAddTaskForm();
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/collections/${this.state.collectionId}`} />);
        }
        return (
            <div className="create-project-form">
                <h1>Build a Project</h1>
                <h2>Fill out your project details</h2>
                <form onSubmit={this.submitForm}>
                    <p className="input">
                        <label>Name</label>
                        <input name="name" type="text" placeholder="Give your project a name" onChange={this.onChange} value={this.state.name} />
                    </p>
                    <p className="input">
                        <label>Description (optional)</label>
                        <textarea name="description" placeholder="Add details about your project" onChange={this.onChange} value={this.state.description}></textarea>
                    </p>
                    <h2>Add tasks to your project</h2>
                    {this.state.tasks.map((task, index) => {
                        return (
                            <div className="task" key={index}>
                                <span className="task-name">{task.name}</span>
                            </div>
                        );
                    })}
                    <p>
                        <a onClick={this.toggleAddTaskForm} className={"add-task-button " + (this.state.addingTask ? "hidden" : "")}>
                            ADD TASK
                        </a>
                    </p>
                    <div className={"add-task-form " + (this.state.addingTask ? "" : "hidden")}>
                        <h3>Add new task</h3>
                        <p className="input">
                            <label>Name</label>
                            <input name="taskName" 
                                type="text" 
                                placeholder="Give your task a name"
                                onChange={this.onChange} value={this.state.taskName} />
                        </p>
                        <p className="input">
                            <label>Description (optional)</label>
                            <textarea name="taskDescription"
                                placeholder="Add details about your task"
                                onChange={this.onChange} value={this.state.taskDescription}></textarea>
                        </p>
                        <p className="input">
                            <label>Due date (optional)</label>
                            <input name="taskDueDate" 
                                type="date"
                                placeholder="Select a due date"
                                onChange={this.onChange} value={this.state.taskDueDate} />
                        </p>
                        <p>Task type</p>
                        <p className="inline-input">
                            <input name="taskType" type="radio"
                                value="Content task"
                                onChange={this.onChange} />
                            <label>Content task</label>
                            <input name="taskType" type="radio"
                                value="To-do task"
                                onChange={this.onChange} />
                            <label>To-do task</label>
                        </p>
                        <p>
                            <a onClick={this.saveTask}>Save task</a>
                        </p>
                    </div>
                    <p>
                            <input className="add-task-button" type="submit" value="CREATE PROJECT" />
                        </p>
                </form>
            </div>
        );
    }




}

export default NewProjectView;