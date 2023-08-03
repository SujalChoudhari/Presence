import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
function Navbar() {


  return (
    <>
      <div className={styles.container}>
        <div className={styles.button}>
          <Link href="/dashboard">
            <Image className={styles.image} src="/home.png" alt="Dashboard" width={64} height={64} />
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="/report">
            <Image className={styles.image} src="/report.png" alt="Dashboard" width={64} height={64} />

          </Link>
        </div>
        <div className={styles.button}>
          <Link href="/profile">
            <Image className={styles.image} src="/profile.png" alt="Dashboard" width={64} height={64} />

          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar