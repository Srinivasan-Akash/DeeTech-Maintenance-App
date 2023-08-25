import React from 'react'
import Image from 'next/image'
export default function loadingScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        fontSize: '24px',
        zIndex: 9999,
      }}
    >
      <Image src={"/preloader.gif"} width={213} height={120} />
    </div>
  )
}
