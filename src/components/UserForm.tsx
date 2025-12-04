//Component:User Form
//Author: Sarah Lam
//Description: Collects the user information such as name, age, gender


import {useState} from "react";
import styled from "styled-components";
import type { User } from "../interfaces/User";

// Container for the whole form
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-family: cursive;
`;

// heading inside the form
const SectionTitle = styled.h2`
  margin-bottom: 0.8rem;
`;

// Label-like text above inputs
const FieldLabel = styled.p`
  margin: 0.3rem 0;
`;

// Text input for age
const TextInput = styled.input`
  padding: 0.2rem 0.4rem;
  background-color: #1a1a1a;
  border-radius: 4px;
  border: 1px solid #555;
  color: white;
`;

// Select for gender
const StyledSelect = styled.select`
  padding: 0.2rem 0.4rem;
  background-color: #1a1a1a;
  border-radius: 4px;
  border: 1px solid #555;
  color: white;
`;

// One row for each checkbox
const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

// Submit button
const SubmitButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-top: 0.7rem;

  &:hover {
    border-color: #646cff;
  }
`;


interface UserFormProps {
    onSubmit: (user: User) => void;
}
// userform send info to the app component after user submits the form
function UserForm({onSubmit}:UserFormProps){

  const[hat,setHat]=useState(false);
   const[shoe,setShoe]=useState(false);
   const[bottom,setBottom]=useState(false);
   const[top,setTop]=useState(false);
   const[age,setAge]=useState("");
  const[gender,setGender]=useState("");


  //run for form after submitted
  function submit(f){
    f.preventDefault();

  const val= 
  {
    age:age,
    gender:gender,
  preferences:{
    top:top,
    bottom:bottom,
    shoe:shoe,
    hat:hat,
  },
};
    onSubmit(val);
}

// rendering of the user input

    return (
        <FormContainer onSubmit={submit}>
            <SectionTitle>Your information!</SectionTitle>

            <FieldLabel>Your Age</FieldLabel>
            <TextInput
                value={age}
                onChange={(f) => setAge(f.target.value)}
            />

            <FieldLabel>Your Gender</FieldLabel>
            <StyledSelect onChange={(f) => setGender(f.target.value)}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
            </StyledSelect>

            <FieldLabel>Decide what to wear!</FieldLabel>

            <CheckboxRow>
                <input
                    type="checkbox"
                    checked={hat}
                    onChange={() => setHat(!hat)}
                />
                Hat 🧢
            </CheckboxRow>

            <CheckboxRow>
                <input
                    type="checkbox"
                    checked={bottom}
                    onChange={() => setBottom(!bottom)}
                />
                Bottom 👖
            </CheckboxRow>

            <CheckboxRow>
                <input
                    type="checkbox"
                    checked={top}
                    onChange={() => setTop(!top)}
                />
                Top 👕
            </CheckboxRow>

            <CheckboxRow>
                <input
                    type="checkbox"
                    checked={shoe}
                    onChange={() => setShoe(!shoe)}
                />
                Shoe 👟
            </CheckboxRow>

            <SubmitButton type="submit">Your fit</SubmitButton>
        </FormContainer>
    );

}
//export for components to be used in App      
export default UserForm;

