import { render, screen } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

describe("Register", () => {
    test("Expect Register to render", () => {
        render(<BrowserRouter><Register /></BrowserRouter>);
        expect(screen.getByTestId('registration-header')).toBeInTheDocument();
    })
})