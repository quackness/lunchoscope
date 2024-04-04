'use client';
import React, {useEffect} from 'react';
import { useAuth } from '@/Context/userAuth';

const Success = () => {

  console.log(useAuth)

  const { user } = useAuth();
  console.log(user)

  return (
    
    <div>Payment Success</div>
  )
}

export default Success;
