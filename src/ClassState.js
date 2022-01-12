import React from "react";
import { Loading } from "./Loading";

const SECURITY = 'olaqueace'

class ClassState extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: ''
    }
  }
  componentDidUpdate(){
    if(this.state.loading){
      setTimeout(()=>{
        if(SECURITY === this.state.value){
          this.setState({loading: false, error: false})
        } else {
          this.setState({error: true, loading: false})
        }
      },3000)
    }
  }
  render () {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {(this.state.error && !this.state.loading) && <p>Error: El código es incorrecto</p>}
        {this.state.loading && (<Loading/>)}
        <input placeholder="Código de seguridad" value={this.state.value} onChange={(event)=> {this.setState({value: event.target.value})}} />
        <button onClick={()=>this.setState({loading: !this.state.loading})}>Comprobar</button>
      </div>
    )
  }
}

export {ClassState}