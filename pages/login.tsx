import React, { useState, useRef } from 'react'
import CustomCard from '../components/CustomCard'
import CustomButton from '../components/CustomButton'
import Link from 'next/link'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { FormContainer, FormCell, StyledInput, ErrorMessage, CenterScreen } from '../styles/Shared'

function Login() {
  const emailRef: React.MutableRefObject<any> = useRef()
  const passwordRef: React.MutableRefObject<any> = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: any): Promise<void> {
    data.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      router.push('/')
    } catch (e) {
      setError('Failed to log in')
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <CenterScreen>
    <FormContainer>
      <CustomCard>
        <h2 className='text-center mb-4 text-xl'>Log In</h2>
        <ErrorMessage>{error && error}</ErrorMessage>
        <form onSubmit={handleSubmit}>
          <FormCell id='email'>
            <label htmlFor=''>Email</label>
            <StyledInput
              type='email'
              ref={emailRef}
              required
            />
          </FormCell>
          <FormCell id='password'>
            <label htmlFor=''>Password</label>
            <StyledInput
              type='password'
              ref={passwordRef}
              required
            />
          </FormCell>
          <CustomButton type='submit' disabled={loading} className='m-4'>
            Login
          </CustomButton>
        </form>
        <div>
          <Link href='/forgot-password'>
            <a>Forgot password?</a>
          </Link>
        </div>
      </CustomCard>
      <div className='w-full text-center mt-4'>
        Need an account?
        <Link href='/signup'>
          <a className='font-semibold ml-1'>Sign up</a>
        </Link>
      </div>
    </FormContainer>
    </CenterScreen>
  )
}

export default Login
