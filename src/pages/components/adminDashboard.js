import styles from '@/styles/Dashboard.module.css';
import React from 'react'
import Image from 'next/image';
import { FaSearch, FaBell } from 'react-icons/fa';

export default function adminDashboard() {
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
          <h3>Louis Carter</h3>
          <p>qa.sixsigma@gmail.com</p>
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
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.area}</td>
                      <td>{item.motorName}</td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </main>
    </div>

  )
}
