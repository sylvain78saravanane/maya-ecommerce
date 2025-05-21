"use client"

import { useRouter } from 'next/navigation';
import SplashAnimation from '@/components/splash-animation';

export default function SplashPage() {
  const router = useRouter();
  
  const handleAnimationComplete = () => {
    router.push('/');
  };
  
  return <SplashAnimation onComplete={handleAnimationComplete} />;
}