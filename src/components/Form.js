import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import ReactTooltip from 'react-tooltip';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #DA4453, #89216B);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  }
  input {
    margin-right: 10px;
  }
`;

const initialFormState = {
    name: "",
    password: "",
    passwordConfirm: "",
    birth: "",
    age: "",
    accept: false
}

export default function Form() {
    const [formState, setFormState] = React.useState(initialFormState)
    const [agreeTerms, setAgreeTerms] = React.useState(initialFormState.accept)

    const handleSumbit = e => {
        // console the form state
        console.log(formState)
        const passwordCheck = formState.password === formState.passwordConfirm
        e.preventDefault()
        if (agreeTerms && passwordCheck) {
            alert('Form Submitted')
            window.location.reload(false);
        }
        else alert('An error has occurred submitting the form')
    }

    const handleInput = e => {
        const inputName = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormState(prev => ({ ...prev, [inputName]: value }));
    };

    return (
        <>
            <GlobalStyle />
            <StyledFormWrapper>
                <StyledForm onSubmit={handleSumbit}>
                    <h2>Create User</h2>
                    <label htmlFor="name" />
                    <StyledInput type='text' name="name" placeholder="Enter your name" value={formState.name} onChange={handleInput} required maxLength="50" />
                    <label htmlFor="password" />
                    <StyledInput type='password' name="password" placeholder="Enter a password" value={formState.password} onChange={handleInput} required minLength="8" maxLength="20" />
                    <label htmlFor="passwordConfirm" />
                    <StyledInput type='password' name="passwordConfirm" placeholder="Confirm your password" value={formState.passwordConfirm} onChange={handleInput} required />
                    <label htmlFor="birth" />
                    <StyledInput type='date' name="birth" value={formState.birth} onChange={handleInput} required />
                    <label htmlFor="age" />
                    <StyledInput type='text' name="age" placeholder="Enter your age" value={formState.age} onChange={handleInput} required maxLength='3' />
                    <StyledFieldset>
                        <legend >Terms</legend>
                        <label>
                            <input type="radio" value={true} onChange={() => setAgreeTerms(true)} name="Terms" />
                            Accept
                        </label>
                        <label>
                            <input data-tip="You must accept terms to submit form" type="radio" value={false} onChange={() => setAgreeTerms(false)} name="Terms" />
                            Do Not Accept
                        </label>
                        <ReactTooltip />
                    </StyledFieldset>
                    <StyledButton type="submit">Submit</StyledButton>
                </StyledForm>
            </StyledFormWrapper>
        </>
    )
}