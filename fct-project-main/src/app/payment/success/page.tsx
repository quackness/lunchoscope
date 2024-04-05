'use client';
import React from 'react';
import { useAuth } from '@/Context/userAuth';
import Success1 from '@/components/Frontend/success1';



const Success = () => {

  console.log(useAuth)

  const { user } = useAuth();
  console.log(user)

  return (
    
   <Success1 />
  )
}

export default Success;
