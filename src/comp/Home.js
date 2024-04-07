import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import Table from 'react-bootstrap/Table'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { LuView } from 'react-icons/lu'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import { LinkContainer } from 'react-router-bootstrap'
import Message from './Message'
import FormContainer from './FormContainer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/esm/Spinner'

import Paginate from './Paginate'
import axios from 'axios'

let itemsPerPage = 3;

const Home = () => {
  let { id: userId } = useParams()
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  let [curPage, setCurPage] = useState(1)

  let pageHandler = (no) => {
    console.log('Pageno', no)
    setCurPage(no)
  }


  //API request to get Data from backend (mockApi) 
  // this is async task so async await is used, to handle error try actch block used
  async function fetchData() {
    try { 
      setLoading(true)
      let re = await axios('https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI')
      setData(re.data)
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }
// useEffect hook used to actually make a api call whenever dependecy changes
  useEffect(() => {
    fetchData()
  }, [data.length, curPage])

  // API call to delete item 
  async function deleteHandler(userId) {
    alert('Do You Want To Delete Item ')
    let re = await axios.delete(
      `https://660ba4e6ccda4cbc75dd4947.mockapi.io/MPVPI/${userId}`
    )
    if (re.status === 200) {
      toast.success('Item Deleted successfully')
    }
    fetchData()
  }

  console.log('curpg', curPage)
// pagination logic 
  let lastIndex = curPage * itemsPerPage
  let firstIndex = itemsPerPage - curPage * itemsPerPage
  

  return (
    <Container fluid style={{ marginTop: '30px' }} className="container">
      <Row>
        <Col>
          {loading ? (
            <Spinner />
          ) : data?.length === 0 ? (
            <>
              <Message
                text={'contact unavilable , add contact first'}
                variant={'danger'}
              ></Message>
              <div>
                {' '}
                <LinkContainer to={'/addedit'}>
                  <Button variant="primary" disabled={loading}>
                    {' '}
                    Add Contact
                  </Button>
                </LinkContainer>{' '}
              </div>
            </>
          ) : (
            <>
              <div style={{ margin: '10px 0' }}>
                <LinkContainer to={'/addedit'}>
                  <Button> Add Contact </Button>
                </LinkContainer>
              </div>
              <Row>
                <Col xs={12}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Icon </th>
                        <th>Name</th>
                        <th className="email">Email </th>
                        <th>Contact</th>
                        <th className="skill">Skills </th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.slice(firstIndex, lastIndex)?.map((el, i) => {
                        return (
                          <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>
                              <img
                                src={el.avatar}
                                width={'30px'}
                                height={'30px'}
                              />
                            </td>

                            <td>{el.name}</td>
                            <td className="email">{el.email}</td>
                            <td>{el.contact}</td>
                            <td className="skill">
                              {el?.skills?.map((item) => {
                                return <span>{item} </span>
                              })}{' '}
                            </td>
                            <td>
                              <LinkContainer to={`/update/${el.id}`}>
                                <Button variant="primary" size="sm">
                                  {' '}
                                  <FaEdit />{' '}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>
                              <LinkContainer to={`/view/${el.id}`}>
                                <Button variant="secondary" size="sm">
                                  {' '}
                                  <LuView />{' '}
                                </Button>
                              </LinkContainer>
                            </td>
                            <td>
                              {' '}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteHandler(el.id)}
                              >
                                <MdDeleteForever />{' '}
                              </Button>{' '}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <div>
                {/* pagination component  */}
                <Paginate
                  length={data.length}
                  pageHandler={pageHandler}
                  itemsPerPage={itemsPerPage}
                  currentPage={curPage}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home
