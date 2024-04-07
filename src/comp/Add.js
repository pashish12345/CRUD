import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FormContainer from './FormContainer'
import Button from 'react-bootstrap/esm/Button'
import { toast } from 'react-toastify'

import Message from './Message'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import * as yup from 'yup'
import { FaSketch } from 'react-icons/fa'
import axios from 'axios'
import { Container } from '@mui/material'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

const initialState = {
  name: '',
  email: '',
  contact: '',
  gender: '',
  skills: [],
}

const Add = () => {
  let navigate = useNavigate()
  let [formData, setFormData] = useState(initialState)
  let [error, setError] = useState({})
  let[loading,setLoading] = useState(false);

  // validation is done by Yup , here schema is created 
  let validationSchema = yup.object({
    name: yup.string().required('first name is required'),
    email: yup.string().required('email is required').email('invalid format'),
    contact: yup
      .string()
      .required('contact no is required')
      .matches(/^\d{10}$/, 'pbone no must be of 10 digit'),
  });
// set value entered by user in form input
  function changeHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
// API call to send  the entered data to backend 
  async function submitHandler(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await validationSchema.validate(formData, { abortEarly: false })
      await axios.post('https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI',formData)
      toast.success('user added sucessfully ')
      navigate('/')
    } catch (error) {
      let newError = {}
      console.log('error', error.inner)
      error.inner.forEach((err) => {
        newError[err.path] = err.message
      })
      setError(newError)
      toast.error('invalid input')
    }finally{
      setLoading(false)
    }
  }

// handle checkbox 
  function checkboxHanadler(e) {
    let { name, checked } = e.target
    let copyCheckbox = [...formData.skills]
    if (checked) {
      copyCheckbox.push(name);
    } else {
      copyCheckbox = copyCheckbox.filter((el) => el !== name)
    }
    setFormData({ ...formData, skills: copyCheckbox })
  }

  return (
    <Container>
      <Row style={{display:'flex', justifyContent:'center'}}>
        <Col md={8}>
        <LinkContainer to="/" style={{ margin: '10px' }}>
        <Button variant="success" disabled={loading}>Go Back </Button>
      </LinkContainer>
      <h2 style={{ textAlign: 'center' }}> Add Contacts</h2>

      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId={formData.name}>
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="amit"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          {error.name && <div style={{ color: 'red',margin:'10px 0' }}>{error.name} </div>}
          <Form.Group className="mb-3" controlId={formData.email}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="amit@example.com"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          {error.email && <div style={{ color: 'red',margin:'10px 0' }}>{error.email} </div>}
          <Form.Group className="mb-3" controlId={formData.contact}>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="number"
              name="contact"
              placeholder="9764989898"
              onChange={(e) => changeHandler(e)}
            />
          </Form.Group>
          {error.contact && (
            <div style={{ color: 'red',margin:'10px 0' }}>{error.contact} </div>
          )}

          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={changeHandler}
          >
            <option>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <br />

          <Form.Label htmlFor=""> skills </Form.Label>
          <br />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Form.Label htmlFor=""> React </Form.Label>
            <Form.Check
              type="checkbox"
              name="react"
              onChange={checkboxHanadler}
              checked={formData.skills.includes('react')}
            />
            <Form.Label htmlFor=""> Python </Form.Label>
            <Form.Check
              type="checkbox"
              name="python"
              onChange={checkboxHanadler}
              checked={formData.skills.includes('python')}
            />
            <Form.Label htmlFor=""> C++ </Form.Label>
            <Form.Check
              type="checkbox"
              name="C++"
              onChange={checkboxHanadler}
              checked={formData.skills.includes('C++')}
            />
          </div>
          <Button  disabled={loading}type="submit" >Submit form</Button>
        </Form>
      </FormContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Add
