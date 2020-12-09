import React from 'react';

import List from '../../../../display/List/List';
import ProjectOverview from '../ProjectOverview/ProjectOverview';

function ProjectList({ projectList, onDelete }) {
    return projectList ? 
        <List listItems={projectList} render={item => (
            <ProjectOverview project={item} onDelete={onDelete} />
        )}/> : 
        "No projects"
}

export default ProjectList;