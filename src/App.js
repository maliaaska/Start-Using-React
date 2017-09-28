import React from 'react';
import PropTypes from 'prop-types';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: "this is the state text",
      cat: 0
    }
  }
  update ( e ) {

    this.setState ({txt: e.target.value})
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.update.bind(this)}/>

        <h1>{this.state.txt} - {this.state.cat}</h1>
      </div>
    )
  }
}
export default App

//     let txt = this.props.txt     let cat = this.props.cat;     return ( <div>
//         <h1>{txt}</h1>         <h1>{cat}</h1>       </div>     )   } const
// App = () => <div> <h1>HELLO STATELESS</h1> <p>hheehheheehh</p> </div>
// App.propTypes = {   txt: PropTypes.string,   cat: PropTypes.number.isRequired
// } App.defaultProps = {   txt: " this is the default txt"