import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe("Dashboard", () => {
    const initialState = { deposit: {}, loan: { loanData: {} } }
    const mockStore = configureStore()
    const store = mockStore(initialState);
    test("Expect Dashboard to render", () => {
        render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);
        expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    })
})