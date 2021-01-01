import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import projectsApi from '../../api/projects';
import withEdit from '../../components/hocs/withEdit/withEdit';

function ProjectDetails(props) {
    const auth = useAuth();
    const project = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}`,
        auth.user ? auth.user.token : null
    );
    const collaborators = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    );

    const EditBox = withEdit(Col, "text");
    const EditArea = withEdit(Col, "textarea");

    const handleEdit = async (value) => {
        const result = await projectsApi.updateProject(props.match.params.projectId, auth.user.token, value);
        console.log(result);
    }

    return (
        <Container fluid>
                <Row className="justify-content-center">
                    <EditBox as="h3" value={project.data.name} name="name" onEdit={handleEdit}>
                        {project.data.name}
                    </EditBox>
                </Row>
                
                <Row className="justify-content-center">
                    <EditArea as="p" value={project.data.description} name="description" onEdit={handleEdit}>
                        {project.data.description}
                    </EditArea>
                </Row>

                <Row>
                    <Col as="h5">Collaborators:</Col>
                </Row>
                
                {
                    collaborators && collaborators.data.map((collab, key) => {
                        return (
                            <Row key={key}>
                                <Col style={{ textAlign: "right" }}>{`${collab.firstName} ${collab.lastName}`}</Col>
                                <Col style={{ textAlign: "left" }}>{collab.userName}</Col>
                            </Row>
                        )
                    })
                }

                <Row>
                    <Col as="h5">Issues:</Col>
                </Row>

                <Row style={{ justifyContent: "center" }}>{`There are ${project.data.issues && project.data.issues.length} issues related to this project`}</Row>
                <Row>{}</Row>
                <Row>{}</Row>
                <Row>{}</Row>
        </Container>
    );
}

export default ProjectDetails;