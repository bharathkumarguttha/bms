import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
    test("Expect Login to render", () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        expect(screen.getByTestId('login-header')).toBeInTheDocument();
    })
})