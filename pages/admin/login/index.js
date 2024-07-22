import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={{position:'relative', top:200, left:400, width:600, background:'red', display:'flex', justifyContent:'space-around'}}>
      <div style={{width:300, height:300, background:'#38394E'}}>
        <span style={{color:'white', fontSize:30, fontFamily:'cursive', position:'relative', left:30}}>Welcome Admin</span>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='E-Mail'
            type="email" 
            required 
            style={{width:250, height:30, borderRadius:3, position:'relative', left:20}} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          /><br/><br/><br/>
          <input 
            placeholder='Password'
            type="password" 
            required 
            style={{width:251, height:30, borderRadius:3, position:'relative', left:20}} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          /><br/><br/><br/>
          <button 
            type="submit" 
            style={{backgroundColor:'red', width:250, height:30, borderRadius:3, color:"white", position:'relative', left:20}}
          >
            Sign in
          </button>
        </form>
      </div>
      <div>
        <img src='/adminLoginPicture.jpg' alt="Admin Login" style={{width:300, height:300}}/>
      </div>
    </div>
  );
}

export default Login;
