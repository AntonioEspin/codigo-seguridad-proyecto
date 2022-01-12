import React from "react";

const SECURITY = 'olaqueace'

const UseState = ({name}) => {
  const[error, setError] = React.useState(false)
  const[loading, setLoading] = React.useState(false)
  const[value, setValue] = React.useState('')
  const[deleted, setDeleted] = React.useState(false)
  const[confirmed, setConfirmed] = React.useState(false)

  const handleChange = () => {
    setLoading(!loading)
    setError(false)
  }
  
  React.useEffect(()=>{
    console.log('Ejecutando efecto')
    if(loading){
      setTimeout(()=>{
        if(SECURITY === value){
          setLoading(false)
          setConfirmed(true)
          // setError(false)
        } else {
          setError(true)
          setLoading(false)
        }
      },3000)
    }
    console.log('Terminando efecto')
  },[loading])

  if(!deleted && !confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {error && (<p>Error: El código es incorrecto</p>)}
        {loading && (<p>Cargando...</p>)}
        <input placeholder="Código de seguridad" value={value} onChange={(event)=> setValue(event.target.value)}/>
        <button onClick={handleChange}>Comprobar</button>
      </div>
    )
  } else if (confirmed && !deleted) {
    return (
      <>
        <p>Pedimos confirmación, ¿Estás seguro?</p>
        <button onClick={()=>{setDeleted(true)}}>Si, estoy seguro</button>
        <button onClick={()=>{setConfirmed(false)}}>No, ya no quiero hacerlo</button>
      </>
    )
  } else {
    return (
      <>
        <p>Lo eliminaste</p>
        <button onClick={()=>{setDeleted(false); setConfirmed(false)}}>Recuperarlo</button>
      </>
    )
  }
}

export {UseState}