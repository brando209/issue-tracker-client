import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import { ChangePasswordSchema } from '../../utility/schema/validation';

export default function ChangePasswordForm(props) {
    return (
        <Formik
            initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }}
            onSubmit={(values) => {
                console.log("Submitting", values.currentPassword, values.newPassword)
                props.onSubmit(values.currentPassword, values.newPassword);
            }}
            validationSchema={ChangePasswordSchema}
        >
            {() => (
                <Form className="form">
                    <Row>
                        <Col>
                            <label htmlFor="currentPassword">Current Password</label>
                        </Col>
                        <Col>
                            <Field name="currentPassword" type="password" autoComplete="new-password"/>
                            <span className="form-error">
                                <ErrorMessage name="currentPassword"/>
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="newPassword">New Password</label>
                        </Col>
                        <Col>
                            <Field name="newPassword" type="password" autoComplete="new-password" />
                            <span className="form-error">
                                <ErrorMessage name="newPassword" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        </Col>
                        <Col>
                            <Field name="confirmNewPassword" type="password" autoComplete="off" />
                            <span className="form-error">
                                <ErrorMessage name="confirmNewPassword" />
                            </span>
                        </Col>
                    </Row>

                    <Row>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )
}