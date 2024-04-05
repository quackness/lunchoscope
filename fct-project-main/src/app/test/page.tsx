
'use client'
import React from 'react';
import { useAuth } from '@/Context/userAuth';

const Page = () => {
    const { user } = useAuth();
    console.log(user)
  return (
    <div>
      test
    </div>
  )
}

export default Page
