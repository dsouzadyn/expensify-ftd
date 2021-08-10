import { Alert, AlertIcon } from "@chakra-ui/alert";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Text, VStack } from "@chakra-ui/layout";
import { Box, Button, Fade, Flex, Grid, Input, Spacer } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as React from "react";
import * as Yup from "yup"
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { registerUser } from "../../servies/auth.service";

type SignUpFormProps = {

}

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpFormState {
    hasError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

const SignUpFormValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(4, 'Too Short!').max(32, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required')
})

export class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
    initialValues: SignUpFormData = { email: '', password: '', confirmPassword: '' }

    constructor(props: SignUpFormProps) {
        super(props)
        this.state = {
            hasError: false,
            isSuccess: false,
            errorMessage: ''
        }
    }

    handleSubmit = async (values: SignUpFormData, actions: FormikHelpers<SignUpFormData>) => {
        try {
            const responseData = await registerUser(values.email, values.password)
            if (responseData.detail) {
                this.setState({ hasError: true, isSuccess: false, errorMessage: responseData.detail })
            } else {
                this.setState({ hasError: false, isSuccess: true })
            }
        } catch (error) {
            console.error(error);
        } finally {
            actions.setSubmitting(false);
        }
    }
    render() {
        return (<Box textAlign="center" fontSize="xl">
            <Grid>
                <ColorModeSwitcher justifySelf="flex-end" />
                <Flex>
                    <Spacer />
                    <Box w="320px">
                        <Fade in={true}>
                            <Formik initialValues={this.initialValues}
                                onSubmit={this.handleSubmit}
                                validationSchema={SignUpFormValidationSchema}>
                                {(props: FormikProps<any>) => (
                                    <Form>
                                        <VStack>
                                            <Text fontSize="4xl">Expensify</Text>
                                            {this.state.hasError && (<Alert stauts="error">
                                                <AlertIcon />
                                                {this.state.errorMessage}
                                            </Alert>)}
                                            {
                                                this.state.isSuccess && (
                                                    <Alert status="success">
                                                        <AlertIcon />
                                        Account created successfully
                                                    </Alert>
                                                )
                                            }
                                            <Field name="email">
                                                {({ field, form, meta }: FieldProps) => (
                                                    <FormControl isInvalid={!!meta.error && meta.touched}>
                                                        <Input {...field} placeholder="Email" />
                                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name="password">
                                                {({ field, form, meta }: FieldProps) => (
                                                    <FormControl isInvalid={!!meta.error && meta.touched}>
                                                        <Input type="password" {...field} placeholder="Password" />
                                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="confirmPassword">
                                                {({ field, form, meta }: FieldProps) => (
                                                    <FormControl isInvalid={!!meta.error && meta.touched}>
                                                        <Input type="password" {...field} placeholder="Confirm Password" />
                                                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button type="submit" colorScheme="blue" isLoading={props.isSubmitting} isFullWidth={true}>Signup</Button>
                                        </VStack>
                                    </Form>
                                )}
                            </Formik>
                        </Fade>
                    </Box>
                    <Spacer />
                </Flex>
            </Grid>
        </Box >
        )
    }
}