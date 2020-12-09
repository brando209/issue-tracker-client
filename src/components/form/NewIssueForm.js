import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';

function NewIssueForm({ onSubmit }) {
    return (
        <Formik
            initialValues={{ title: "", description: "", category: "other", priority: "regular", status: "unassigned" }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    const newIssue = values;
                    delete newIssue.assign;
                    onSubmit(newIssue)
                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                    <h3>Add New Issue</h3>

                    <div>
                        <label htmlFor="title">Issue Title</label>
                        <Field name="title" type="text" className="form-input" />
                        <ErrorMessage name="title" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Field name="description" as="textarea" className="form-input" />
                        <ErrorMessage name="description" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <Field name="category" as="select" className="form-input">
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="task">Task</option>
                            <option value="other">Uncategorized</option>
                        </Field>
                        <ErrorMessage name="category" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="priority">Priority</label>
                        <Field name="priority" as="select" className="form-input">
                            <option value="trivial">Trivial</option>
                            <option value="low">Low</option>
                            <option value="regular">Regular</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </Field>
                        <ErrorMessage name="priority" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="assign">Assign</label>
                        <Field name="assign" type="text" className="form-input" />
                        <ErrorMessage name="assign" className="form-error" />
                    </div>

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Add Issue
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default NewIssueForm;