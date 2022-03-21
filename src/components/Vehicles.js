import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";

export default function Vehicles() {
    const [Users, fetchUsers] = useState([])

    const getData = () => {
        fetch('http://localhost:8080/brand')
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                fetchUsers(res)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Button onClick={getData()} variant="contained">YEEEESSSSSSSSS</Button>
        </>
    )
}
