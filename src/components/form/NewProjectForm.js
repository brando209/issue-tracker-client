import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { ProjectSchema } from '../../utility/schema/validation';

function NewProjectForm({ onSubmit }) {
    return (
        <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={ProjectSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                    onSubmit(values)
                } catch (err) {
                    console.log(err);
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                    <h3>Create New Project</h3>

                    <div>
                        <label htmlFor="name">Project Name</label>
                    </div>
                    <div>
                        <Field name="name" type="text" className="form-input" />
                        <ErrorMessage name="name" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div>
                        <Field name="description" type="text" className="form-input" />
                        <ErrorMessage name="description" className="form-error" />
                    </div>

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Create Project
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default NewProjectForm;