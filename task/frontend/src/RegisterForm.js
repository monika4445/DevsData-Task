import { useState } from 'react';


function RegisterForm({ eventId }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
  
      if (response.ok) {
        alert('Registration successful!');
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message}`);
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    );
  }
  
  export default RegisterForm;
  