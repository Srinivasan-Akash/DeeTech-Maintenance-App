import styles from '@/styles/Dashboard.module.css';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FaSearch, FaBell } from 'react-icons/fa';

import { database } from '../appwrite/appwriteConfig';
import { v4 as uuidv4 } from 'uuid';

export default function employeeDashboard({ userInfo, tasks }) {

  const data = [
    {
      area: "Raw Se wage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    },
    {
      area: "Raw Sewage",
      motorName: "Raw Sewage Pump Motor",
      description: "Check temperature",
      status: "DONE"
    }
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} width={40} height={40} src={"/Login/logo.png"} alt='A profile pic' />
          <h1>Dee-Tech MA</h1>
        </div>

        <div className={styles.userInfo}>
          <Image className={styles.profilePic} width={100} height={120} src={"/dashboard/profile.jpeg"} alt='A profile pic' />
          <h3>{userInfo.name}</h3>
          <p>{userInfo.email}</p>
        </div>

        <div className={styles.navItems}>
          <p>Dashboard</p>
          <p>Notifications</p>
          <p>Schedule</p>
          <p>Settings</p>
        </div>
      </aside>

      <main className={styles.main}>
        <nav className={styles.mainNavbar}>
          <h1>Statistics</h1>
          <div className={styles.rightSideNav}>

            <div className={styles.inputBox}>
              <FaSearch className={styles.searchIcon} />
              <input className={styles.searchField} placeholder='Search Tasks' />
            </div>
            <button className={styles.logOut}>Log Out</button>
            <button className={styles.notificationBell}><FaBell /></button>
          </div>
        </nav>

        <main className={styles.mainContent}>
          <div className={styles.tasksContainer}>
            <nav className={styles.tasksNavbar}>
              <div>
                <h2>Total Tasks</h2>
                <p><b>12</b> Tasks Remaining</p>
              </div>

              <div className={styles.right}>
                <div>
                  <h2>12:30</h2>
                  <p>Current Time</p>
                </div>

                <div>
                  <h2>1:30</h2>
                  <p>Time Remaining</p>
                </div>
              </div>
            </nav>

            <div className={styles.tasksList}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.headlinesTable}>
                    <th>Area</th>
                    <th>Motor Name</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks ? (
                    tasks.map((task, index) => (
                      <>
                        <tr key={index}>
                          {/* <td>{task.area}</td>
                      <td>{task.motorInfo}</td>
                      <td>{task.tasks}</td>
                      <td>{task.status}</td> */}
                          <td rowSpan={5}>Centrifuge</td>
                          <td>MOTOR A</td>
                          <td>5</td>
                          <td>DONE</td>
                        </tr>
                        <tr>
                          <td>MOTOR 2</td>
                          <td>1</td>
                          <td>DONE</td>
                        </tr></>
                    ))
                  ) : (
                    <tr>
                      <td>Loading tasks...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </main>
    </div>

  )
}
