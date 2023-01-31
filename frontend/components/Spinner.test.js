// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import Spinner from "./Spinner"
import React from "react";
import App from "./App";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const usernameInput = () => screen.findByPlaceholderText("Enter username");
const passwordInput = () => screen.queryByPlaceholderText(/Enter password/i);
const loginButton = () => screen.queryByText(/Submit Credentials/i);



test('sanity', () => {
  expect(true).toBe(true)
})

test('renders without errors', () => {
  render (<Spinner on={true}/>)
})

test('renders when prop is true', () => {
  render (<Spinner on={true}/>)
  const spinnerText = () => document.querySelector("#spinner")
  expect(spinnerText()).toBeInTheDocument();
})

test('does not renders when prop is false', () => {
  render (<Spinner on={false}/>)
  const spinnerText = () => document.querySelector("#spinner")
  expect(spinnerText()).not.toBeInTheDocument();
})

// test('spinner spins upon logging in', async () => {
//   fireEvent.change(usernameInput(), {target : {value: 'foo'} });
//   fireEvent.change(passwordInput(), {target : {value: '12345678'} });
//   fireEvent.click(loginButton())

// })
