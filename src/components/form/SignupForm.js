import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { SignupSchema } from '../../utility/schema/validation';

function SignupForm(props) {
    return (
        <Formik
            initialValues={{ firstName: "", lastName: "", email: "", userName: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, form) => {
                form.setSubmitting(true);
                try {
                    await props.onSubmit(values);
                } catch (err) {
                    console.log(err);
                }
                form.setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (<Form className="form" autoComplete="false">
                <h3>Sign Up</h3>
                <div>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div>
                    <Field name="firstName" type="text" className="form-input" />
                    <ErrorMessage name="firstName" className="form-error" />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div>
                    <Field name="lastName" type="text" className="form-input" />
                    <ErrorMessage name="lastName" className="form-error" />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                </div>
                <div>
                    <Field name="email" type="text" className="form-input" />
                    <ErrorMessage name="email" className="form-error" />
                </div>

                <div>
                    <label htmlFor="userName">Display Name</label>
                </div>
                <div>
                    <Field name="userName" type="text" className="form-input" autoComplete="off"/>
                    <ErrorMessage name="userName" className="form-error" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <Field name="password" type="password" className="form-input" autoComplete="off"/>
                    <ErrorMessage name="password" className="form-error" />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div>
                    <Field name="confirmPassword" type="password" className="form-input" />
                    <ErrorMessage name="confirmPassword" className="form-error" />
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>

                <p>Already have an account? <Link to="login">Log in</Link> to continue.</p>
            </Form>)}
        </Formik>
    )
}

export default SignupForm;