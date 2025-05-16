'use client'

import { useState } from 'react'
import DetailCompanyForm from '@/components/auth/register/DetailCompanyForm'
import MembershipForm from '@/components/auth/register/MembershipForm'
import RegistrationFormCompany from '@/components/auth/register/RegistrationFormCompany'
import RegistrationFormMember from '@/components/auth/register/RegistrationFormMember'
import RoleSelection from '@/components/auth/register/RoleSelection'
import { Role } from '@prisma/client'

// Base interface for common registration data
interface RegistrationData {
  role: Role
  username: string
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

// Define steps as const to ensure type safety
const STEPS = {
  ROLE_SELECTION: 'ROLE_SELECTION',
  REGISTRATION_FORM_MEMBER: 'REGISTRATION_FORM_MEMBER',
  REGISTRATION_FORM_COMPANY: 'REGISTRATION_FORM_COMPANY',
  MEMBERSHIP_FORM_MEMBER: 'MEMBERSHIP_FORM_MEMBER',
  DETAIL_COMPANY_FORM: 'DETAIL_COMPANY_FORM',
} as const

type StepType = (typeof STEPS)[keyof typeof STEPS]

export default function Register() {
  const [currentStep, setCurrentStep] = useState<StepType>(STEPS.ROLE_SELECTION)

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    role: 'MEMBER',
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleContinue = () => {
    switch (currentStep) {
      case STEPS.ROLE_SELECTION:
        if (registrationData.role === Role.MEMBER) {
          setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER)
        } else if (registrationData.role === Role.COMPANY) {
          setCurrentStep(STEPS.REGISTRATION_FORM_COMPANY)
        }
        break
      case STEPS.REGISTRATION_FORM_MEMBER:
        setCurrentStep(STEPS.MEMBERSHIP_FORM_MEMBER)
        break
      case STEPS.REGISTRATION_FORM_COMPANY:
        setCurrentStep(STEPS.DETAIL_COMPANY_FORM)
        break
    }
  }
  const handleBack = () => {
    switch (currentStep) {
      case STEPS.REGISTRATION_FORM_MEMBER:
      case STEPS.REGISTRATION_FORM_COMPANY:
        setCurrentStep(STEPS.ROLE_SELECTION)
        break
      case STEPS.MEMBERSHIP_FORM_MEMBER:
        setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER)
        break
      case STEPS.DETAIL_COMPANY_FORM:
        setCurrentStep(STEPS.REGISTRATION_FORM_COMPANY)
        break
    }
  }

  const handleRoleSelection = (roleId: Role) => {
    // First reset the registration data
    setRegistrationData({
      role: roleId,
      username: '',
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  const handleRegistrationForm = (formData: {
    username: string
    fullname: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setRegistrationData((prev) => ({
      ...prev,
      ...formData,
    }))
    handleContinue()
  }

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.ROLE_SELECTION:
        return (
          <RoleSelection
            onSelectRole={handleRoleSelection}
            onSubmit={handleContinue}
          />
        )
      case STEPS.REGISTRATION_FORM_MEMBER:
        return (
          <RegistrationFormMember
            onSubmit={handleRegistrationForm}
            onBack={handleBack}
            data={registrationData}
          />
        )
      case STEPS.REGISTRATION_FORM_COMPANY:
        return (
          <RegistrationFormCompany
            onSubmit={handleRegistrationForm}
            onBack={handleBack}
            data={registrationData}
          />
        )
      case STEPS.MEMBERSHIP_FORM_MEMBER:
        return <MembershipForm onBack={handleBack} data={registrationData} />
      case STEPS.DETAIL_COMPANY_FORM:
        return <DetailCompanyForm onBack={handleBack} data={registrationData} />
      default:
        return null
    }
  }

  return <>{renderStep()}</>
}
