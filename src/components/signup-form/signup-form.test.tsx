import React from "react";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "../../test-utils"
import { SignUpForm } from "../signup-form/signup-form.component";
import userEvent from "@testing-library/user-event";


describe('Testing Signup Form', () => {
    test('email and password are both required', async () => {
        render(<SignUpForm />)
        const button = screen.getByText("Signup")
        fireEvent.click(button)
        const requiredText = await screen.findAllByText(/required/i)
        expect(requiredText).toHaveLength(3)
    })
    test('entering an invalid email should give an error', async () => {
        render(<SignUpForm />)
        const email = screen.getByPlaceholderText("Email")
        userEvent.type(email, "test@test")
        fireEvent.blur(email)
        const errorText = await screen.findByText(/email must be a valid email/i)
        expect(errorText).not.toBeNull()
    })
    test('entering a valid email should not give an error', async () => {
        render(<SignUpForm />)
        const email = screen.getByPlaceholderText("Email")
        userEvent.type(email, 'test@test')
        fireEvent.blur(email)
        const errorText = await screen.findByText(/email must be a valid email/i)
        expect(errorText).not.toBeNull()
        userEvent.clear(email)
        userEvent.type(email, 'test@test.com')
        fireEvent.blur(email)
        await waitForElementToBeRemoved(() => screen.queryByText(/email must be a valid email/i))
        const valid = await screen.queryByText(/email must be a valid email/i)
        expect(valid).toBeNull()
    })
    test('entering only one password should give an error', async () => {
        render(<SignUpForm />)
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const button = screen.getByText("Signup")
        userEvent.type(email, 'test@test.com')
        fireEvent.blur(email)
        userEvent.type(password, 'testpassword')
        fireEvent.blur(password)
        fireEvent.click(button)
        const requiredText = await screen.findAllByText(/required/i)
        expect(requiredText).toHaveLength(1)
    })
    test('entering dis similar passwords should give an error', async () => {
        render(<SignUpForm />)
        const email = screen.getByPlaceholderText("Email")
        const password = screen.getByPlaceholderText("Password")
        const confirmPassword = screen.getByPlaceholderText("Confirm Password")
        const button = screen.getByText("Signup")
        userEvent.type(email, 'test@test.com')
        fireEvent.blur(email)
        userEvent.type(password, 'testpassword')
        fireEvent.blur(password)
        userEvent.type(confirmPassword, 'testpassword2')
        fireEvent.blur(confirmPassword)
        fireEvent.click(button)
        const passwordsMustMatchText = await screen.findAllByText(/passwords must match/i)
        expect(passwordsMustMatchText).toHaveLength(1)
    })
})