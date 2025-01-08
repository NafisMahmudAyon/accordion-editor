import Image from 'next/image'
import React from 'react'
import logoSvg from '../public/logo.svg'  

const Logo = () => {
  return (
  <Image src={logoSvg} alt='logo' height={30}  />
  )
}

export default Logo