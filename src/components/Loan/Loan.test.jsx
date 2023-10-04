import { render, screen } from "@testing-library/react";
import Loan from "./Loan";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe("Loan", () => {
    const initialState = { deposit: {}, loan: {} }
    const mockStore = configureStore()
    const store = mockStore(initialState);
    test("Expect Loan to render", () => {
        render(<Provider store={store}><BrowserRouter><Loan /></BrowserRouter></Provider>);
        expect(screen.getByTestId('loan-header')).toBeInTheDocument();
    })
})