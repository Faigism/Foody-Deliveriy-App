import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthCheck = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    const localAdmin = localStorage.getItem('localAdmin')
    if (!localAdmin) {
      router.push('/admin/login')
    }
  }, [router])
  return <>{children}</>
}
export default AuthCheck
