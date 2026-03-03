import { useState } from 'react'
// import validator from 'validator'

const App = () => {
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState([])
  const [strength, setStrength] = useState('')

  const validatePassword = (value) => {
    setPassword(value)

    if (value.length === 0) {
      setFeedback('')
      setStrength('')
      return
    }

    const checks = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*]/.test(value),
    }

    const passedChecks = Object.values(checks).filter(Boolean).length

    let strengthLevel = ''
    let strengthColor = ''

    if (passedChecks <= 2) {
      strengthLevel = 'Weak'
      strengthColor = 'text-red-600'
    } else if (passedChecks <= 3) {
      strengthLevel = 'Fair'
      strengthColor = 'text-yellow-600'
    } else if (passedChecks <= 4) {
      strengthLevel = 'Good'
      strengthColor = 'text-blue-600'
    } else {
      strengthLevel = 'Strong'
      strengthColor = 'text-green-600'
    }

    setStrength(strengthLevel)

    const feedbackMessages = [
      !checks.length && 'At least 8 characters',
      !checks.uppercase && 'At least one uppercase letter',
      !checks.lowercase && 'At least one lowercase letter',
      !checks.number && 'At least one number',
      !checks.special && 'At least one special character (!@#$%^&*)',
    ].filter(Boolean)

    setFeedback(feedbackMessages)
  }

  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h1 className='text-2xl font-bold mb-4 text-gray-800'>Password Validator</h1>
        
        <input 
          type="password" 
          placeholder='Enter your password' 
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          // onChange={(e) => setPassword(e.target.value)}
          className='border-2 border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:border-blue-500' 
        />

        {strength && (
          <div className='mb-4'>
            <p className={`text-lg font-semibold ${strength === 'Strong' ? 'text-green-600' : strength === 'Good' ? 'text-blue-600' : strength === 'Fair' ? 'text-yellow-600' : 'text-red-600'}`}>
              Strength: {strength}
            </p>
          </div>
        )}

        {feedback.length > 0 && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4'>
            <p className='text-sm font-semibold text-red-700 mb-2'>Requirements to be met:</p>
            <ul className='text-sm text-red-600 space-y-1'>
              {feedback.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.length === 0 && password.length > 0 && (
          <div className='bg-green-50 border border-green-200 rounded-md p-4'>
            <p className='text-sm font-semibold text-green-700'>Password meets all requirements!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
