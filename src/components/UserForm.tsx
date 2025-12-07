//Component:User Form
//Author: Sarah Lam
//Description: Collects the user information such as name, age, gender


import {useState} from "react";
import styled from "styled-components";
import type { User } from "../interfaces/User";

// Container for the whole form
const FormContainer = styled.form`
  width: 70vw;                    /* use most of the width */
  max-width: 900px;               /* optional safety cap */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
  padding: 3vh 4vw;
  margin-bottom: 4vh;
  background-color:  rgba(50, 69, 105, 0.36);
  border-radius: 2vh;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

// heading inside the form
const SectionTitle = styled.h2`
  font-size: calc(1.8vw + 1.4vh);
  margin: 0 0 2vh;
  color:  #1C1C1E;
`;

// Label-like text above inputs
const FieldLabel = styled.p`
  margin: 0.5vh 0;
  font-size: calc(0.9vw + 0.9vh);
 color: #1C1C1E;
`;

// Text input for age
const TextInput = styled.input`
  width: 40vw;
  max-width: 320px;
  padding: 1vh 1vw;
  background-color: #2A2D32;
  border-radius: 1vh;
  border: 0.2vh solid #4b5563;
  color: #e5e7eb;
  font-size: calc(0.9vw + 0.8vh);
  box-sizing: border-box;
`;

// Select for gender
const StyledSelect = styled.select`
  width: 40vw;
  max-width: 320px;
  padding: 1vh 1vw;
  background-color: #1C1C1E;
  border-radius: 1vh;
  border: 0.2vh solid #4b5563;
  color: #e5e7eb;
  font-size: calc(0.9vw + 0.8vh);
  box-sizing: border-box;
`;

// One row for each checkbox
const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  font-size: calc(0.9vw + 0.8vh);
 color: #1C1C1E;
`;

// Submit button
const SubmitButton = styled.button`
  margin-top: 2vh;
  padding: 1.2vh 2.4vw;
  border-radius: 1.5vh;
  border: 0.2vh solid transparent;
  font-size: calc(0.9vw + 0.9vh);
  font-weight: 500;
  background-color: #8CA9CF; /* soft blue */
  color: #1C1C1E;
  cursor: pointer;
  transition: background-color 0.25s, transform 0.15s;

  &:hover {
    background-color: #7C98C0;
    transform: translateY(-0.3vh);
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
            <SectionTitle>Your information</SectionTitle>

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

