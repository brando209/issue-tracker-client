import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { IssueSchema } from '../../utility/schema/validation';

function NewIssueForm({ onSubmit, collaborators }) {
    return (
        <Formik
            initialValues={{ title: "", description: "", category: "other", priority: "regular", status: "unassigned", assigneeId: "" }}
            validationSchema={IssueSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log("Submitting")
                setSubmitting(true);
                try {
                    const newIssue = values;

                    if(newIssue.assigneeId === "") delete newIssue.assigneeId;
                    else newIssue.status = "open";

                    await onSubmit(newIssue);
                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                    <Row as="h3">Add New Issue</Row>

                    <Row>
                        <Col>
                            <label htmlFor="title">Issue Title</label>
                        </Col>
                        <Col>
                            <Field name="title" type="text" className="form-input" />
                            <ErrorMessage name="title" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="description">Description</label>
                        </Col>
                        <Col>
                            <Field name="description" as="textarea" className="form-input" />
                            <ErrorMessage name="description" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="category">Category</label>
                        </Col>
                        <Col>
                            <Field name="category" as="select" className="form-input">
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                                <option value="task">Task</option>
                                <option value="other">Uncategorized</option>
                            </Field>
                            <ErrorMessage name="category" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="priority">Priority</label>
                        </Col>
                        <Col>
                            <Field name="priority" as="select" className="form-input">
                                <option value="trivial">Trivial</option>
                                <option value="low">Low</option>
                                <option value="regular">Regular</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </Field>
                            <ErrorMessage name="priority" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="assign">Assign</label>
                        </Col>
                        <Col>
                            <Field name="assigneeId" as="select" className="form-input" >
                                <option value="">Unassigned</option>
                                {
                                    collaborators.map(user => <option value={user.id}>{user.userName}</option>)
                                }
                            </Field>
                            <ErrorMessage name="assign" className="form-error" />
                        </Col>
                    </Row>

                    <Row>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Add Issue
                        </Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )
}

export default NewIssueForm;