import React from 'react'
import Alert from 'react-bootstrap/Alert'
const Message = ({text, variant,}) => {
  return (
    <div>
      <Alert  variant={variant} >
          {text} 
        
        </Alert>
    </div>
  )
}

export default Message
