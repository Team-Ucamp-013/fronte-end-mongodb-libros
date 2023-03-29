import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
const [ datos, setDatos] = useState([])
const [form , setForm] = useState({
  titulo:"",
  autor: "",
  año: ""
})
const [post, setPost]= useState([])

//----- obtener datos
const getDatos = async()=>{
  const url = 'http://localhost:4003/books'
  const response = await axios.get(url)
  console.log(response)
  setDatos(response.data)
}
// ----- Postear datos 
const postData = async(e)=>{
 e.preventDefault()
 console.log(e)

  const obtenerDatos = {
    titulo: form.titulo,
    autor: form.autor,
    año: form.año
  }

 const url = 'http://localhost:4003/books'
 const response = await axios.post(url, obtenerDatos)
 console.log(response.data)
 setPost(response.data)
 getDatos(); 
}
 
const deleteItem = async(e) => {
const url = `http://localhost:4003/books/${e}`
console.log(url)
const response = await axios.delete(url)
console.log(response)
getDatos(); 
}

const editItem = async(id)=> {

 const url = `http://localhost:4003/books/${id}`
 console.log(url)
//  const response = await axios.get(url)
//  const bookEdit = response.data
//  console.log(bookEdit)
//  setForm({
//   titulo: bookEdit.titulo,
//   autor: bookEdit.autor,
//   año: bookEdit.año
//  })


//  const updateBook = {
//   titulo: form.titulo,
//   autor: form.autor,
//   año: form.año
//  }
//   await axios.put(url, updateBook)
//   getDatos(); 
}

useEffect(()=>{
  getDatos();
},[]); 

  return (
    <div>
        <form onSubmit={postData} >
          <input type="text" placeholder='Titulo' value={form.titulo} onChange={(e)=> setForm({...form, titulo: e.target.value})}/>
          <input type="text" placeholder='Autor' value={form.autor} onChange={(e)=> setForm({...form, autor: e.target.value})}/>
          <input type="number" placeholder='Año'value={form.año} onChange={(e)=> setForm({...form, año: e.target.value})}/>
          <button>Enviar</button>
        </form>

      {datos.map(x =>
           <div key={x._id}>
             <h1>{x.titulo}</h1>
             <h3>{x.autor}</h3>
             <h3>{x.año}</h3>
             <button value={x._id} onClick={(e)=> deleteItem(e.target.value)}>Borrar</button>
             <button onClick={() => editItem(x._id)}>Editar</button>
           </div>)}
    </div>
  )
}

export default App
