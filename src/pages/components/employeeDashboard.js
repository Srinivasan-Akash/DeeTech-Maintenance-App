import styles from '@/styles/Dashboard.module.css';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FaSearch, FaBell } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import EmployeeSettings from './employeeSettings';
import { account, database } from '../appwrite/appwriteConfig';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillCloseCircle } from "react-icons/ai";
import EmployeeForm from './employeeForm';
import { Query } from 'appwrite';

export default function employeeDashboard({ userInfo, tasks }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formUIData, setFormUIData] = useState();
  const [completedTasks, setCompletedTasks] = useState();

  const router = useRouter()
  console.log(tasks, "TASKL")

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  const openForm = (e) => {
    const tableRow = e.target.parentNode.parentNode
    const table = tableRow.parentNode

    const motorName = tableRow.querySelector("td").innerText
    const totalMotors = tableRow.querySelector("td:nth-child(2)").innerText
    const area = table.querySelector("td").innerText

    setFormUIData({ motorName, totalMotors, area })
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const logOut = async () => {
    try {
      await account.deleteSession("current")
      router.push("/")

      toast.success(`✨ Logged Out Sucessfully`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch {
      toast.success(`❌ Logging Out Failed !`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  useEffect(() => {
    const promise = database.listDocuments("64d45c73133d8e39e84d", "64d775e89561f5813b3a", [Query.equal("employeeEmail", userInfo.email)]);

    promise.then(function (response) {
      setCompletedTasks(response)
      console.log(response, "DATA BASE RESPONSE IDIOT !!"); // Success
    }, function (error) {
      console.log(error); // Failure
    });
  }, [isPopupOpen])

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(18, 0, 0, 0); // 6:00 PM IST
      let remainingTime = targetTime - now;
      if (remainingTime < 0) {
        remainingTime = 0;
      }
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    };
    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [])

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} width={40} height={40} src={"/Login/logo.png"} alt='A profile pic' />
          <h1>Dee-Tech MA</h1>
        </div>

        <div className={styles.userInfo}>
          <Image className={styles.profilePic} width={100} height={120} src={"/dashboard/profile.png"} alt='A profile pic' />
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
        {isPopupOpen && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <nav>
                <h1>Maintenance of {formUIData.totalMotors} {formUIData.motorName} at {formUIData.area}</h1>
                <button className={styles.closeButton} onClick={closePopup}><AiFillCloseCircle /></button>
              </nav>
              <EmployeeForm userInfo={userInfo} formUIData={formUIData} tasks={tasks}></EmployeeForm>

            </div>
          </div>
        )}
        <nav className={styles.mainNavbar}>
          <h1>Statistics</h1>
          <div className={styles.rightSideNav}>

            <div className={styles.inputBox}>
              <FaSearch className={styles.searchIcon} />
              <input className={styles.searchField} placeholder='Search Tasks' />
            </div>
            <button onClick={logOut} className={styles.logOut}>Log Out</button>
            <button onClick={toggleSettingsPanel} className={styles.settingsIcon}>
              <FaGear />
            </button>
            {isSettingsPanelOpen && (
              <div className={styles.settingsPanel}>
                <EmployeeSettings userInfo={userInfo} />
              </div>
            )}
          </div>
        </nav>

        <main className={styles.mainContent}>
          <div className={styles.tasksContainer}>
            <nav className={styles.tasksNavbar}>
              <div>
                <h2>Total Tasks</h2>
                <p><b>{tasks ? (tasks[0].motorInfo.split(",").length).toString().padStart(2, '0'): 0}</b> Tasks Remaining</p>
              </div>

              <div className={styles.right}>
                <div>
                  <h2>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
                  <p>Current Time</p>
                </div>

                <div>
                  <h2>{timeRemaining}</h2>
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
                    <th>Total Motors</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <td rowSpan={5}>{tasks ? tasks[0].area : 'Loading area...'}</td>

                  {tasks ? (
                    tasks.map((task, index) => (
                      <>
                        {task.motorInfo.split(",").map((motor, index) => (
                          <tr key={index}>
                            <td>{motor.slice(0, -1)}</td>
                            <td>{motor.charAt(motor.length - 1)}</td>
                            <td>
                              <button onClick={openForm}>Complete</button>
                            </td>
                          </tr>
                        ))}
                      </>
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

          <div className={styles.completedTasksContainer}>
            <nav className={styles.tasksNavbar}>
              <div>
                <h2>Completed Employee Tasks</h2>
                <p><b>{completedTasks ? completedTasks.total : 0}</b> sucessfully completed.</p>
              </div>

              <div className={styles.right}>
                <div>
                  <h2>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
                  <p>Current Time</p>
                </div>

                <div>
                  <h2>{timeRemaining}</h2>
                  <p>Time Remaining</p>
                </div>
              </div>
            </nav>

            <div className={styles.tasksList}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.headlinesTable}>
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>Area</th>
                    <th>Motor Name</th>
                    <th>Temperature</th>
                    <th>Vibration</th>
                    <th>Bearing Noise</th>
                    <th>Current Consumption</th>
                    <th>Duty VS Power</th>
                    <th>Cleanliness</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks ? (
                    completedTasks.documents.map((task, index) => (
                      <tr>
                        <td>{task.employeeName}</td>
                        <td>{task.employeeEmail}</td>
                        <td>{task.area}</td>
                        <td>{task.motorName}</td>
                        <td>{task.temperature || "N/A"}</td>
                        <td>{task.vibration || "N/A"}</td>
                        <td>{task["bearing-noise"] || "N/A"}</td>
                        <td>{task["current-consumption"] || "N/A"}</td>
                        <td>{task["duty-vs-power"] || "N/A"}</td>
                        <td>{task.cleanliness || "N/A"}</td>
                      </tr>
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
