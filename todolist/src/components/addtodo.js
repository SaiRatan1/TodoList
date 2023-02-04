import React from 'react'
import { useState } from 'react'

const Addtodo = ({addfunc}) => {
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const inputdim = {
        width: "520px",
        height: "30px",
        marginBottom: "10px",
        paddingLeft: "10px"
    };
    let check=(e)=>{
        e.preventDefault()
        if(!title || !des){
            alert('Enter two values')
        }
        else{
            addfunc(title,des);
            setTitle('');
            setDes('');
        }
    }
    return (
        <div>
            <form>
                <input type="text" placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}} style={inputdim} /><br />
                <input type="text" placeholder='Description' value={des} onChange={(e)=>{setDes(e.target.value)}} style={inputdim} /><br />
                <button className='addbutton' onClick={(e)=>{check(e)}} >Add Todo</button><br />
            </form>
        </div>
    )
}

export default Addtodo
