import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CollectionView.css';

import getProjects from '../../queries/getProjects';

class CollectionView extends Component {
    constructor({ match }) {
        super();
        this.state = {
            id: match.params.id,
            projects: []
        };
    }

    async componentDidMount() {
        const result = await fetch('/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getProjects(this.state.id))
        });
        const json = await result.json();
        this.setState({
            projects: json.data.projects
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Projects</h1>
                <div className="projects">
                    <Link className="new-project" to={`/collections/${this.state.id}/projects/new`}>
                        Create New Project
                    </Link>
                {this.state.projects.map((project) => {
                    return (
                        <div className="project" key={project.id}>
                            {project.name}
                        </div>
                    )
                })}
                </div>
            </div>
        );
    }

}

export default CollectionView;