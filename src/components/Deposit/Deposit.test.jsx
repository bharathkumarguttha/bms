import { render, screen } from "@testing-library/react";
import Deposit from "./Deposit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe("Deposit", () => {
    const initialState = { deposit: {}, loan: {} }
    const mockStore = configureStore()
    const store = mockStore(initialState);
    test("Expect Deposit to render", () => {
        render(<Provider store={store}><BrowserRouter><Deposit /></BrowserRouter></Provider>);
        expect(screen.getByTestId('deposit-header')).toBeInTheDocument();
    })
})