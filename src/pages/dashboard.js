import React, { useEffect, useState } from 'react'
import EmployeeDashboard from '../components/employeeDashboard'
import AdminDashboard from '../components/adminDashboard'
import LoadingScreen from '../components/loadingScreen';
import styles from '@/styles/Dashboard.module.css';
import { account, database } from '../appwrite/appwriteConfig';
import { useRouter } from 'next/router';
import { Query } from 'appwrite';
// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function dashboard() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();
  const [tasks, setTasks] = useState()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const userData = account.get()
    userData.then(
      function (userInformation) {
        setUserDetails(userInformation)
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

        const getTasks = database.listDocuments("64d45c73133d8e39e84d", "64d5f385d4889c9ffbda", [Query.equal("email", userInformation.email)]);
        getTasks.then(
          function (tasksRes) {
            setTasks(tasksRes.documents);
          },
          function (tasksErr) {
            console.log(tasksErr);
          }
        )
        setLoader(false);
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
    );
  }, [router]);

  return (
    <div className={styles.dashboardContainer}>
      {loader ? (
                <LoadingScreen />
            ) : userDetails && userDetails.prefs.role === 'operator' ? (
                <EmployeeDashboard userInfo={userDetails} tasks={tasks}/>
            ) : (
                <AdminDashboard userInfo={userDetails}/>
            )}
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
