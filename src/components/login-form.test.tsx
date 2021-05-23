import React from "react"
import { fireEvent, screen, wait, waitFor, waitForElement, waitForElementToBeRemoved } from "@testing-library/react"
import { render } from "../test-utils"
import { LoginForm } from "./login-form.component";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

test("renders the expensify app title", () => {
    render(<LoginForm />)
    const linkElement = screen.getByText(/expensify/i)
    expect(linkElement).toBeInTheDocument()
})

test("email and password are both required", async () => {
    render(<LoginForm />)
    const button = screen.getByText("Login")
    fireEvent.click(button)
    const requiredText = await screen.findAllByText(/required/i)
    expect(requiredText).toHaveLength(2)
})

test("entering an invalid email should give an error", async () => {
    render(<LoginForm />)
    const email = screen.getByPlaceholderText("Email")
    userEvent.type(email, 'test@test')
    fireEvent.blur(email)
    const errorText = await screen.findByText(/email must be a valid email/i);
    expect(errorText).not.toBeNull()

})

test("entering a valid email should not give an error", async () => {
    render(<LoginForm />)
    const email = screen.getByPlaceholderText("Email")
    userEvent.type(email, 'test@test')
    fireEvent.blur(email)
    let errorText = await screen.findByText(/email must be a valid email/i);
    expect(errorText).not.toBeNull()
    userEvent.clear(email);
    userEvent.type(email, 'test@test.com')
    fireEvent.blur(email)
    await waitForElementToBeRemoved(() => screen.queryByText(/email must be a valid email/i))
    const valid = await screen.queryByText(/email must be a valid email/i)
    expect(valid).toBeNull()

})
