import React from "react";

const SECURITY = 'olaqueace'

const UseReducer = ({name}) => {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(()=>{
    console.log('Ejecutando efecto')
    if(state.loading){
      setTimeout(()=>{
        if(SECURITY === state.value){
          dispatch({type: 'CONFIRM'})
        } else {
          dispatch({type: 'ERROR'})
        }
      },3000)
    }
    console.log('Terminando efecto')
  },[state.loading])

  if(!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {state.error && (<p>Error: El código es incorrecto</p>)}
        {state.loading && (<p>Cargando...</p>)}
        <input placeholder="Código de seguridad" value={state.value} onChange={(event)=> dispatch({type: 'WRITE', payload: event.target.value})}/>
        <button onClick={()=> dispatch({type:'CHECK'})}>Comprobar</button>
      </div>
    )
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmación, ¿Estás seguro?</p>
        <button onClick={()=>{dispatch({type: 'DELETE'})}}>Si, estoy seguro</button>
        <button onClick={()=>{dispatch({type:'RESET'})}}>No, ya no quiero hacerlo</button>
      </>
    )
  } else {
    return (
      <>
        <p>Lo eliminaste</p>
        <button onClick={()=>dispatch({type:'RESET'})}>Recuperarlo</button>
      </>
    )
  }
}

const initialState = {
  error: false,
  loading: false,
  value: '',
  deleted: false,
  confirmed: false,
}

// use reducer con switch

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONFIRM':
      return {
        ...state,
        loading: false,
        confirmed: true,
        error: false
      }

    case 'CHECK':
      return{
        ...state,
        loading: true,
        error: false
      }

    case 'ERROR': 
      return {
        ...state,
        error: true,
        loading: false
      }

    case 'WRITE':
      return{
        ...state,
        value: action.payload
      }
    
    case 'DELETE':
      return{
        ...state,
        deleted: true
      }

    case 'RESET':
      return{
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
      }

    default: {
      return {
        ...state
      }
    }
  }
}


// usereducer con objects
// const reducerOBJECT = (state) => ({
//   'ERROR': {
//       ...state,
//       error: true,
//       loading: false,
//   },
//   'CONFIRM': {
//       ...state,
//       error: false,
//       loading: false,
//       confirmed: true,
//   },
// })

// const reducer = (state, action) => {
//   if (reducerOBJECT(state)[action.type]) {
//       return reducerOBJECT(state)[action.type];
//   } else {
//       return {
//           ...state,
//       }
//   }
// }

export {UseReducer}