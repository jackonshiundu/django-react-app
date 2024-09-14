import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'
const Home = () => {
  const [notes,setNotes]=useState([])
  const [content,setContent]=useState('')
  const [title,setTitle]=useState('')

  useEffect(()=>{
    getNotes()
  },[])
  const getNotes=async()=>{
    await api.get('/api/notes/').then((res)=>res.data).then((data)=>setNotes(data)).catch((error)=>alert(error))
  }
  const deleteNote=(id)=>{
    api.delete(`/api/notes/delete/${id}/`).then((res)=>{
      if(res.status==204) alert('Note Was Deleted')
      else alert('Failed to delete note')
    getNotes()
    }).catch((error)=>alert(error))
    
  }

  const createNote=(e)=>{
    e.preventDefault()
    api.post('/api/notes/',{content,title}).then((res)=>{
      if (res.status == 201 )alert('Note created')
      else alert('failed to make Note')
      getNotes()
    }).catch((err)=>alert(err))
  

  }
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=>(
          <Note note={note} key={note.id} onDelete={deleteNote}/>
        ))}
      </div>
      <h2>Create  a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label><br />
        <input type="text" id='title' name='title' value={title} required onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="content">Content</label><br />
        <textarea type="text" id='content' name='content' required value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
<br />
<input type="submit" value='Create Note'/>
      </form>
    </div>
  )
}

export default Home