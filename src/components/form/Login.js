import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Login({ onSubmit }) {
    return (
        <Formik
            initialValues={{ userName: "", password: "" }}
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
                    <h3>Log In</h3>

                    <div>
                        <label htmlFor="userName">Username</label>
                    </div>
                    <div>
                        <Field name="userName" type="text" className="form-input" />
                        <ErrorMessage name="userName" className="form-error" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <Field name="password" type="password" className="form-input" />
                        <ErrorMessage name="password" className="form-error" />
                    </div>

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>

                    <p>Don't have an account yet? Please <Link to="signup">Sign up</Link> to continue.</p>
                </Form>
            )}
        </Formik>
    )
}

export default Login;