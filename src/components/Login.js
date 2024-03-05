




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css';

// function Login({ onLogin }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const [showSignup, setShowSignup] = useState(false);
//   const [signupData, setSignupData] = useState({
//     name: '',
//     username: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSignupInputChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // const handleLogin = async () => {
//   //   const response = await fetch("http://localhost:8000/login", {
//   //     method: "POST",
//   //     body: JSON.stringify({
//   //       email:formData.username,
//   //       password:formData.password
//   //     }), // Pass formData directly here
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     }
//   //   });

//   //   console.log(formData)
//   //   const data = await response.json();
//   //   console.log(data);
//   //   if(response.status === 200){
//   //     onLogin();
//   //   }
//   //   else{
//   //     const data = response.json();
//   //     window.alert(data.message);
//   //   }
    
//   // }; 



//   const handleLogin = () => {
//     fetch("http://localhost:8000/login", {
//       method: "POST",
//       body: JSON.stringify({
//         email: formData.username,
//         password: formData.password
//       }), // Pass formData directly here
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(data => {
//           window.alert(data.message);
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       if (data.message === "Logged In successfully!") {
//         onLogin();
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

  



  
//   const handleSignup = () => {
//     setShowSignup(false);
//     setFormData({ username: signupData.username, password: signupData.password });
//   };

//   return (
//     <div className="login-container blur-background">
//       {!showSignup ? (
//         <div className="login-box">
//           <h2>Login</h2>
//           <form>
//             <div className="form-group">
//               <label>Username:</label>
//               <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
//             </div>
//             <div className="form-group">
//               <label>Password:</label>
//               <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
//             </div>
//             <div className="form-group">
//               <button type="button" onClick={handleLogin}>Login</button>
//             </div>
//             <div className="signup-link">
//               <Link to="#" onClick={() => setShowSignup(true)}>New user? Signup</Link>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="signup-box">
//           <h2>Signup</h2>
//           <form>
//             <div className="form-group">
//               <label>Name:</label>
//               <input type="text" name="name" value={signupData.name} onChange={handleSignupInputChange} />
//             </div>
//             <div className="form-group">
//               <label>Username:</label>
//               <input type="text" name="username" value={signupData.username} onChange={handleSignupInputChange} />
//             </div>
//             <div className="form-group">
//               <label>Password:</label>
//               <input type="password" name="password" value={signupData.password} onChange={handleSignupInputChange} />
//             </div>
//             <div className="form-group">
//               <button type="button" onClick={handleSignup}>Register</button>
//             </div>
//             <div className="signup-link">
//               <Link to="#" onClick={() => setShowSignup(false)}>Back to Login</Link>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.username,
        password: formData.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          window.alert(data.message);

   


        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.message === "Logged In successfully!") {
        onLogin();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSignup = () => {
    fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify({
        // name: signupData.name,
        email: signupData.username,
        password: signupData.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          window.alert(data.message);
        });
      }
      setShowSignup(false);
      setFormData({ username: signupData.username, password: signupData.password });
      window.alert('Signup successful. Redirecting to login.');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="login-container blur-background">
      {!showSignup ? (
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleLogin}>Login</button>
            </div>
            <div className="signup-link">
              <Link to="#" onClick={() => setShowSignup(true)}>New user? Signup</Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="signup-box">
          <h2>Signup</h2>
          <form>
            {/* <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={signupData.name} onChange={handleSignupInputChange} />
            </div> */}
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={signupData.username} onChange={handleSignupInputChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={signupData.password} onChange={handleSignupInputChange} />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleSignup}>Register</button>
            </div>
            <div className="signup-link">
              <Link to="#" onClick={() => setShowSignup(false)}>Back to Login</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
