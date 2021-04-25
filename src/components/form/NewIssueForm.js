import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import Upload from './inputs/Upload/Upload';
import { IssueSchema } from '../../utility/schema/validation';

function NewIssueForm({ onSubmit, onRequest, collaborators }) {
    return (
        <Formik
            initialValues={{ title: "", description: "", category: "other", priority: "regular", status: "unassigned", assigneeId: "" }}
            validationSchema={IssueSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    const newIssue = values;

                    await onSubmit(newIssue);

                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="form" id="new-issue-form">
                    <Row as="h3">Add New Issue</Row>

                    <Row>
                        <Col>
                            <label htmlFor="title">Issue Title</label>
                        </Col>
                        <Col>
                            <Field name="title" type="text" className="form-input" />
                            <span className="form-error">
                                <ErrorMessage name="title" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="description">Description</label>
                        </Col>
                        <Col>
                            <Field name="description" as="textarea" className="form-input" />
                            <span className="form-error">
                                <ErrorMessage name="description" className="form-error" />
                            </span>
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
                            <span className="form-error">
                                <ErrorMessage name="category" className="form-error" />
                            </span>
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
                            <span className="form-error">
                                <ErrorMessage name="priority" className="form-error" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="attachments">Attachments</label>
                        </Col>
                        <Col>
                            <Field 
                                name="attachments"
                                as={Upload} 
                                sendRequest={onRequest} 
                                onChange={val => setFieldValue('attachments', val)}
                                className="form-input" 
                            />
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
                                    collaborators.map(user => <option key={user.id} value={user.id}>{user.userName}</option>)
                                }
                            </Field>
                            <span className="form-error">
                                <ErrorMessage name="assign" className="form-error" />
                            </span>
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