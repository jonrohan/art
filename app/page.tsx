import React from 'react'
import styles from './page.module.css'

export default function Page({children}: {children: React.ReactNode}) {
  return (
    <main className={styles.main}>
      {children ? children : (
        <div>Hello World!</div>
      )}
    </main>
  )
}
