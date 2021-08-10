import * as React from "react"
import { VStack, Text, Input, Button, FormControl, FormErrorMessage, Alert, AlertIcon, Grid, Box, Flex, Spacer, Link, Fade, Center } from "@chakra-ui/react"
import { Formik, Form, FormikHelpers, Field, FieldProps, FormikProps } from "formik";
import * as Yup from "yup";
import { fetchToken } from "../../servies/auth.service";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { Link as ReactLink } from "react-router-dom";

type LoginFormProps = {

}

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormState {
    hasError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

const LoginFormValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(4, 'Too Short!').max(32, 'Too Long!').required('Required')
});

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    initialValues: LoginFormData = { email: '', password: '' };

    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            hasError: false,
            isSuccess: false,
            errorMessage: '',
        }
    }

    handleSubmit = async (values: LoginFormData, actions: FormikHelpers<LoginFormData>) => {
        try {
            const tokenData = await fetchToken(values.email, values.password);
            console.log(tokenData);
            if (tokenData.detail) {
                this.setState({ hasError: true, isSuccess: false, errorMessage: tokenData.detail });
            } else {
                this.setState({ hasError: false, isSuccess: true });
            }
        } catch (error) {
            console.error(error);
        } finally {
            actions.setSubmitting(false);
        }


    }



    render() {
        return (

            <Center h="100%">
                <Grid fontSize="xl">
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <Flex fontSize="xl">
                        <Spacer />
                        <Box w="320px">
                            <Fade in={true}>
                                <Formik initialValues={this.initialValues} onSubmit={this.handleSubmit} validationSchema={LoginFormValidationSchema}>

                                    {(props: FormikProps<any>) => (
                                        <Form>
                                            <VStack>



                                                <Text fontSize="4xl">Expensify</Text>
                                                {this.state.hasError && (<Alert status="error">
                                                    <AlertIcon />
                                                    {this.state.errorMessage}
                                                </Alert>)}
                                                {
                                                    this.state.isSuccess && (
                                                        <Alert status="success">
                                                            <AlertIcon />
                        Logged in successfully
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
                                                            <Input type="password" {...field} placeholder="************" />
                                                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>


                                                <Button type="submit" colorScheme="blue" isLoading={props.isSubmitting} isFullWidth={true}>Login</Button>



                                            </VStack>
                                        </Form>
                                    )}
                                </Formik>

                            </Fade>

                        </Box>

                        <Spacer />
                    </Flex>
                </Grid>
                <Text marginTop={8}>
                    New here?{" "}
                    <Link color="teal.500" as={ReactLink} to="/signup">
                        Sign Up
                    </Link>
                </Text>
            </Center>
        )
    }

};
