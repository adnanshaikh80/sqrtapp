import { useState, useRef } from "react";
import axios from "axios";

export default function SquareRoot() {
    const rNum = useRef();
    const [num, setNum] = useState("")
    const [msg, setMsg] = useState("")


    const hNum = (event) => { setNum(event.target.value); }

    const find = (event) => {
        event.preventDefault();
        if (num == "") {
            alert("Nuumber Is Empty");
            setMsg("");
            rNum.current.focus();
            return;
        }
        if (parseFloat(num) < 0) {
            alert("-ve Number Is Not Allowed");
            setNum("");
            setMsg("");
            rNum.current.focus();
            return;
        }
        let url = "http://localhost:9000/find";
        let data = { params: { number: num } };
        axios.get(url, data)
            .then(res => setMsg(res.data.msg))
            .catch(err => setMsg("issue" + err));

    }
    return (
        <>
            <center>
                <h1>Square Root Finder</h1>
                <form onSubmit={find}>
                    <input type="number" step="any" placeholder="Enter Number"
                    onChange={hNum} value={num} ref={rNum}/>
                    <br></br>
                    <input type="submit" value="Find Square Root" />
                </form>
                <h1>{msg}</h1>
            </center>
        </>
    );

}