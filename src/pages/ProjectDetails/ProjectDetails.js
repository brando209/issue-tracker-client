import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import IssueNavBar from '../../components/app/Navigation/IssueNavBar';

function ProjectDetails(props) {
    const auth = useAuth();
    const project = useResource(`http://localhost:3001/api/projects/${props.match.params.projectId}`, auth.user ? auth.user.token : null);
    const collaborators = useResource(`http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`, auth.user ? auth.user.token : null);

    return (
        <Container fluid>
                <Row>
                    <Col as="h3">{project.data.name}</Col>
                </Row>

                <Row>
                    <Col as="p">{project.data.description}</Col>
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