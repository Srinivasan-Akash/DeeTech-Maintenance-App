import Head from 'next/head'
import Login from './components/login'
import styles from '@/styles/Home.module.css'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Dee-Tech Maintenance App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login></Login>
    </React.Fragment>
  )
}
