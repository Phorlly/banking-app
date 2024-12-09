import AuthForm from '@/components/auth-form'
import { getLoggedInUser } from '@/lib/actions/user';
import React from 'react'

const SignUp = () => {

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-up' />
    </section>
  )
}

export default SignUp