import { Container, ListItem } from '@mui/material'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import Row from 'react-bootstrap/esm/Row'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'

const View = () => {
let {id} = useParams();
let [data, setData] = useState({})
let [loading, setLoading] = useState(false);

async function fetchData(){
    try {
        setLoading(true)
        let re=  await axios.get(`https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI/${id}`);
        setData(re.data)
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
}

useEffect(()=>{
fetchData()
},[])


  return (
    <Container style={{margin:'10px 0'}} >
        <Row style={{display:'flex', justifyContent:"center"}}>
            <Col md={6} style={{textAlign:'center'}} >
            <ListGroup variant='flush' >
        <ListGroupItem variant='primary'><h2>{data.id} </h2></ListGroupItem>
        <ListGroupItem><img src={data.avatar} width={'38px'} height={'38px'} /></ListGroupItem>
        
        <ListGroupItem>{data.name}</ListGroupItem>
        <ListGroupItem>{data.email}</ListGroupItem>
        <ListGroupItem variant='info'>{data.contact}</ListGroupItem>
        <ListGroupItem>{data.gender}</ListGroupItem>
        <ListGroupItem variant='primary'>
        {
            data?.skills?.map((el,i)=> <span> {el}, </span>
            )
        }
        </ListGroupItem>
        
        <ListGroupItem>
        <LinkContainer as='div' to={'/'}>
    <div className='d-grid gap-2'>    <Button variant='outline-dark' > Go Back </Button></div>
      </LinkContainer> 
      </ListGroupItem>
    </ListGroup>
   
 
            </Col>
        </Row>
    </Container>
  )
}

export default View
