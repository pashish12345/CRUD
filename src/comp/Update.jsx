import React, { useEffect, useState } from 'react'
import { useFetcher, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Table from 'react-bootstrap/esm/Table';
import FormContainer from './FormContainer';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { Container } from '@mui/material';

const Update = () => {
  let {id:userId} = useParams();
  console.log(userId)
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false)
  let [btndisable, setBtndisable] = useState(false);

let [inputData, setinputData] = useState({
  name:"",
  email:"",
  contact:"",
  gender:'',
  skills:[],
})


// Api call to get data from backend according to id 
async function fetchData(){
  try { 
    setLoading(true)
   let re=  await axios(`https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI/${userId}`);
   console.log("inputre...", re)
   setinputData(re.data)
  } catch (error) {
    toast.error(error)
  }finally{
    setLoading(false)
  }
}

useEffect(()=>{
   fetchData();
},[])



function changeHandler(e){
  setinputData({
    ...inputData,
    [e.target.name] : e.target.value
  })
}

function checkboxHandler(e){
let{name,checked} = e.target;

let copy = [...inputData.skills];
console.log(copy)
if(checked){
copy?.push(name);
}else{
 copy = copy?.filter(el=> el!== name )
}
setinputData({...inputData, skills: copy})
}


async function updateHandler(e){
e.preventDefault();
setBtndisable(true)
setTimeout(() => {
  setBtndisable(false)
}, 2000);
await axios.put(`https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI/${userId}`,inputData);
toast.success("data updated ")
navigate('/')
}

function handleCancel(e){
  setBtndisable(true)
setTimeout(() => {
  setBtndisable(false)
}, 2000);
toast.info("Cancelled Request")
navigate('/')
}
  return (
    <Container>
     <Row>
      <Col>
      {
      loading ? <h2> loading... </h2> :(<>
      <FormContainer>
        <Row style={{display:'flex', justifyContent:'center'}}>
          <Col md={8}>
          <Form>
          <Form.Group className="mb-3" controlId={inputData.name}>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" 
        name='name'
        value={inputData.name} 
        onChange={(e)=>changeHandler(e)}
        placeholder="Enter name" />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId={inputData.email}>
        <Form.Label>Email </Form.Label>
        <Form.Control value={inputData.email}
        name='email'
        onChange={(e)=>changeHandler(e)}
         type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId={inputData.contact}>
        <Form.Label>Contact </Form.Label>
        <Form.Control type="number"
        name='contact'
        onChange={(e)=>changeHandler(e)}
        value={inputData.contact} placeholder="Enter contact" />
      </Form.Group>

     <Form.Group className="mb-3" controlId={inputData.gender}>
        <Form.Label> Gender </Form.Label>
        <Form.Select type="select"
        name='gender'
        onChange={(e)=>changeHandler(e)}
        value={inputData.gender} placeholder="Enter contact"  > 
        <option value={'male'}>Male</option>
        <option value={"female"}>female</option>
        </Form.Select>
    
    </Form.Group>

        <Form.Label> Skill </Form.Label>
        <div style={{display:'flex', gap:'18px'}}>
        <Form.Label>React</Form.Label>
        <Form.Check type='checkbox' name='react' onChange={checkboxHandler}
        checked={inputData?.skills?.includes('react')}
        />
        <Form.Label>python</Form.Label>
        <Form.Check type='checkbox'name='python' onChange={checkboxHandler}
        checked={inputData?.skills?.includes('python')}
        />
        <Form.Label>C++</Form.Label>
        <Form.Check type='checkbox' name='c++' onChange={checkboxHandler}
        checked={inputData?.skills?.includes('c++')}
        />
      
        </div>

      <Button  style={{margin: '0 10px'}} variant="primary" type="submit" onClick={updateHandler}disabled={loading || btndisable} > 
        update
      </Button>
      <LinkContainer to='/'>
      <Button variant="danger" type="submit" onClick={handleCancel} disabled={loading || btndisable}>
      Cancel
      </Button>
      </LinkContainer>
    </Form>

          
          </Col>
        </Row>
      </FormContainer>
    
      
      </>)
     }
      </Col>
     </Row>
    </Container>
  )
}

export default Update

