import { RootState } from '@reduxjs/toolkit/query';
import {ReactNode} from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootStore } from '../store/store';

export default function RequireAuth({children}: {children: ReactNode}) {
  const jwt = useSelector((s: RootStore) => s.user.jwt);
  if(!jwt){
    return <Navigate to="/auth/login" replace />
  }
  return children;
};
