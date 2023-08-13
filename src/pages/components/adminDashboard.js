import styles from '@/styles/Dashboard.module.css';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { FaSearch, FaBell } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import ProfileSettings from './profileSettings';
import { account, database } from '../appwrite/appwriteConfig';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function adminDashboard({ userInfo }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState();
  const [employeeList, setEmployeeList] = useState();

  const router = useRouter()

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
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
    const promise = database.listDocuments("64d45c73133d8e39e84d", "64d775e89561f5813b3a");

    promise.then(function (response) {
      setCompletedTasks(response)
      console.log(response, "DATA BASE RESPONSE IDIOT !!"); // Success
    }, function (error) {
      console.log(error); // Failure
    });
  }, [])

  useEffect(() => {
    const promise = database.listDocuments("64d45c73133d8e39e84d", "64d5f385d4889c9ffbda");

    promise.then(function (response) {
      setEmployeeList(response)
      console.log(response, "setEmployeeList RESPONSE IDIOT !!"); // Success
    }, function (error) {
      console.log(error); // Failure
    });
  }, [])

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
                <ProfileSettings userInfo={userInfo} />
              </div>
            )}
          </div>
        </nav>

        <main className={styles.mainContent}>
          <div className={styles.tasksContainer}>
            <nav className={styles.tasksNavbar}>
              <div>
                <h2>Employee List</h2>
                <p><b>{employeeList ? employeeList.total : 0}</b> Employees are working</p>
              </div>

              <div className={styles.right}>
                <button className={styles.addEmployeeBtn}>Add Employee</button>
              </div>
            </nav>

            <div className={styles.employeesList}>
              {
                employeeList ?
                  employeeList.documents.map((employee, index) => (
                    <div className={styles.employee}>
                      <Image className={styles.profilePic} width={100} height={120} src={'/dashboard/profile.png'} alt='A profile pic' />
                      <div>
                        <h3>{employee.name}</h3>
                        <p>{employee.email}</p>
                      </div>
                    </div>
                  )):
                <div className={styles.employee}>
                  <Image className={styles.profilePic} width={100} height={120} src={'/dashboard/profile.png'} alt='A profile pic' />
                  <div>
                    <h3>Loading.....</h3>
                    <p>Loading....</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className={styles.inCompletedTasksContainer}>
            <nav className={styles.tasksNavbar}>
              <div>
                <h2>Pending Employee Tasks</h2>
                <p><b>12</b> Tasks Remaining</p>
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
                  <td rowSpan={5}></td>

                  {/* {tasks ? (
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
                  )} */}
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
                    <th colSpan={2}>Creatation-Date</th>
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
                        <td colSpan={2}>{new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: "UTC"
                        }).format(new Date(task.$createdAt))}</td>
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
