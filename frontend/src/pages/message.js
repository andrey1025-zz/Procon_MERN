import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const Message = ({ location }) => {
    const [message, setMessage] = useState("")

    useEffect(() => {
        const values = queryString.parse(location.search)
        const { m } = values;
        if (m)
            setMessage(m)
    })

    return (
        <React.Fragment>
            <h5>{message}</h5>
            <Link to={'/authentication/sign-in'}>Go to Login</Link>
        </React.Fragment>
    )
}
export default Message;