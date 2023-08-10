import React, { useEffect, useState } from 'react'
import AdminDashboard from './components/adminDashboard'
import EmployeeDashboard from './components/employeeDashboard'
import LoadingScreen from './components/loadingScreen';
import styles from '@/styles/Dashboard.module.css';
import { account } from '../pages/appwrite/appwriteConfig';
import { useRouter } from 'next/router';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function dashboard() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const userData = account.get()

    userData.then(
      function (res) {
        console.log(res)
        setUserDetails(res)
        toast.success(`✨ Logged In Sucessfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
      function (error) {
        toast.error(`😡 You Are Not Authenticated`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push('/');
      }
    )
  }, [])

  return (
    <div className={styles.dashboardContainer}>
      {userDetails? <AdminDashboard/>: <LoadingScreen/>}
      {/* <AdminDashboard/> */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
