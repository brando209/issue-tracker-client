import React from 'react';

import List from '../../display/List/List';
import ProjectOverview from '../ProjectOverview/ProjectOverview';

function ProjectList({ projectList, ...props }) {
    return projectList ? 
        <List listItems={projectList} render={item => (
            <ProjectOverview project={item} {...props} />
        )}/> : 
        "No projects"
}

export default ProjectList;