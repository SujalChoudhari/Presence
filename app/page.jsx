"use client";

import { useEffect } from 'react'
import styles from "./Loading.module.css"
import { useRouter } from 'next/navigation'
export default function Home() {

  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard')
  }, [])
      

  return (
    <>
      <div className={styles.container}>
        <h1>Presence</h1>
        <h2>Attendance Tracking Application</h2>
      </div>
    </>
  )
}
