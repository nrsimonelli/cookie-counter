import React, { Component } from 'react';

//Utility function -- looks at all the cookies for this page and gives you the one requested
const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(''+cookieName+'[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');
}
const getUserCookie = (username) => {
  const cookieString = RegExp(''+username+'[^;]+').exec(document.cookie);
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');

}

class App extends Component {
  state = {
    clickCount: getCookie('count') || 0,
    cookieUser: getUserCookie('user') || null, 
    usernameIsEditable: false,
    tempName:'',
  }

  handleClick = () => {
    const newCount = Number(this.state.clickCount) + 1;
    
    // This is making a cookie called count with the newCount amount
    // It will replace anything called count
    document.cookie = `count=${newCount}`;

    
    this.setState({
      clickCount: newCount,
    });

  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveUsername = () => {
    const newName = this.state.cookieUser;
    // This is making a cookie called count with the newCount amount
    // It will replace anything called count
    document.cookie = `user=${newName}`;
    this.setState({
      cookieUser: newName,
      usernameIsEditable: false,
    });
  }
  inputOnChange = (event) => {

    this.setState({
      cookieUser: event.target.value
    })
    console.log('username: ', this.state.cookieUser);
  }

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            Username: 
            {/* Username should go here */}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {/* 
              This conditional rendering is using a `ternary` operator. It works like an if/else block.
              The part at the front is being evaluated. The `?` starts the conditions. 
              The first condition is what will be done if true.
              The `:` breaks into the else block.
              
              Rewritten as if/else:
              ```
              let buttonToShow;
              if(this.state.usernameIsEditable) {
                buttonToShow = <button onClick={this.saveUsername}>Save Username</button>
              } else {
                buttonToShow = <button onClick={this.editUsername}>Edit Username</button>
              }
              ```

            */}
            {this.state.usernameIsEditable ?
              <><input className='usernameIn' placeholder='name here' onChange={this.inputOnChange} value={this.state.cookieUser}></input><button onClick={this.saveUsername}>Save Username</button></> :
              <>{this.state.cookieUser}<button onClick={this.editUsername}>Edit Username</button></>
            }
          </p>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}



export default App;
