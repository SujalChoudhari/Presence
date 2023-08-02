import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
function Navbar() {

  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.button}>
          <Link href="/dashboard"> Dashboard </Link>
        </div>
        <div className={styles.button}>
          <Link href="/profile"> Profile </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar