import React from 'react'
import AuthWrapper from '@/components/ui/Wrappers/AuthFormWrapper'
import { AuthFormEnum } from '@/types/enums/auth-form/auth-form'

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper formType={AuthFormEnum.FORGOT_PASSWORD} />
  )
}
