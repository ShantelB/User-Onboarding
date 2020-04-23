import React, {useState, useEffect} from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."), 
    email: yup
      .string()
    //   .email("Must be a valid email address.")
      .required("Must include email address."),
    terms: yup.boolean().oneOf([true], "please agree to terms of use"),
    password: yup.string().required("Password is required"),
  });

function Form(props) {

    const [disable, setDisable] = useState(true);

  const [memberName, setMemberName] = useState({
      name: '', 
      email: '',
      password: '',
      terms: '',
    })  

    const [error, setError] = useState({
        name: '', 
        email: '',
        password: '',
        terms: '',  
    })
    
   const [post, setPost] = useState([])

 useEffect(() => {
    formSchema.isValid(memberName)
    .then(pressed => {
        setDisable(!pressed);
    })
}, [memberName])

const checkChange = event => {

    
    yup
    .reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then(pressed => {
        setError({
            ...error, [event.target.name] : ''
        });
    })
    
    .catch(err => {
        setError({
            ...error, [event.target.name] : err.error[0]
        })
    })
}
 
    const makeChange = event => {
        event.persist();
        const newData = {
            ...memberName, [event.target.name] : 
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        setMemberName(newData);
        // checkChange(event);
    };


    const submitMember = event => {
        event.preventDefault();
        axios
              .post("https://reqres.in/api/users", memberName)
              .then(res => {
                setPost(res.data); 
                console.log("success", post);
            
                setMemberName({
                  name: "",
                  email: "",
                  terms: "",
                  password: "",
                });
              })
              .catch(err => console.log(err.response));
    }
            


    return (
      <div className="Member-List">
      <form onSubmit={submitMember}>

          <label htmlFor="member">Name{error.name.length > 0 ? <p className="error">{error.name}</p> : null}</label>
          <input id="member" type="text" name="name" onChange={makeChange} placeholder="Name" value= {memberName.name} required />
          
          <label htmlFor="email">Email{error.email.length > 0 ? <p className="error">{error.email}</p> : null}</label>
          <input id="email" type="text" name="email" onChange={makeChange} placeholder="Email" value= {memberName.email} required/>

          <label htmlFor="password">Password{error.password.length > 0 ? <p className="error">{error.password}</p> : null}</label>
          <input id="password" type="password" name="password" onChange={makeChange} placeholder="password" value= {memberName.password} required/>

          <input type="checkbox" name="terms" checked={memberName.terms} onChange={makeChange} />
          <label htmlFor="terms" className="terms">Terms and Conditions</label>

          <pre>{JSON.stringify(post, null, 2)}</pre>
         <button disabled={disable} type="submit">Submit</button>
      </form>

      <Container className="card">
          {props.members.map(member => (
              <div className="list" key={member.id}>
                
                <Card className="cards" >
                  <CardBody >
             
                  <CardTitle><h2>Name: {member.name}</h2></CardTitle>
                  <CardSubtitle><h3></h3></CardSubtitle>
                  <CardSubtitle><h3>Email: {member.email}</h3></CardSubtitle>
              
                  </CardBody>
                </Card>
                
          </div>
          ))}
    </Container>

      </div>
    );
  }
  
  export default Form;
  