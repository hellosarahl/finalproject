

import {useState} from "react";


function UserForm({onSubmit}:any){

  const[hat,setHat]=useState(false);
   const[shoe,setShoe]=useState(false);
   const[bottom,setBottom]=useState(false);
   const[top,setTop]=useState(false);
   const[age,setAge]=useState("");
  const[gender,setGender]=useState("");


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



return(
  <form onSubmit= {submit}>
    <h1>Your information!</h1>

    <p>Your Age</p>
    <input value={age} onChange={(f)=>setAge(f.target.value)}
    />
    <p>Your Gender</p>
    <select onChange={(f)=>setGender(f.target.value)}>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
      <option value="Other">Other</option>
    </select>


    <p>Decide what to wear!</p>
    <div>
      <input type="checkbox" onChange={()=>setHat(!hat)}/>Hat 🧢
    </div>
    <div>
      <input type="checkbox" onChange={()=>setBottom(!bottom)}/>Bottom 👖
    </div>
    <div>
      <input type="checkbox" onChange={()=>setTop(!top)}/>Top 👕
    </div>
    <div>
      <input type="checkbox" onChange={()=>setShoe(!shoe)}/>Shoe 👟
    </div>
    <button type="submit">Your fit</button>
   

</form>
);
}
      
export default UserForm;

