import { useState } from 'react'
import './App.css'

function App() {
  const [formcontent, setFormContent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    skills: "",
    phoneNumber: "",
    address: "",
  });

  
  const formfunc = (e) => {
    setFormContent({
      ...formcontent,  
      [e.target.name]: e.target.value,  
    });
  };

  
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(formcontent);
  };

  return (
    <>
      <div className="card">
        <form id="input-box" onSubmit={handlesubmit}>
          <input placeholder="First-Name" type="text" name="firstName" onChange={formfunc} value={formcontent.firstName}></input> 
          <input placeholder="Last-Name" type="text" name="lastName" onChange={formfunc} value={formcontent.lastName}></input>
          <input placeholder="Age" type="number" name="age" onChange={formfunc} value={formcontent.age}></input>
          <input placeholder="Phone no." type="number" name="phoneNumber" onChange={formfunc} value={formcontent.phoneNumber}></input>
          <div id="radio-cont">
          <span>Gender</span>
          <label>
            <input type="radio" name="gender" value="Male" onChange={formfunc} checked={formcontent.gender === "Male"}></input>
            Male
          </label>
          <label>
            <input 
              type="radio" name="gender" value="Female" onChange={formfunc} checked={formcontent.gender === "Female"} 
            ></input>
            Female
          </label>
          </div>
          <input type="text"  name="address" placeholder="address" onChange={formfunc} value={formcontent.address}></input>
          <input type="email"  name="email" placeholder="email" onChange={formfunc} value={formcontent.email}></input>
          
          <select name="skills" onChange={formfunc} value={formcontent.skills}>
            <option value="" disabled>Select your skills</option>
            <option value="Java Developer">Java Developer</option>
            <option value="MERN Developer">MERN Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Devops Engineer">Devops Engineer</option>
          </select>

          <button type="submit" id="subbuttn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
