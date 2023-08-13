import React, { useState } from 'react';
import styles from '@/styles/EmployeeForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { database } from '../appwrite/appwriteConfig';
import { v4 as uuidv4 } from 'uuid';

export default function EmployeeForm({ userInfo, formUIData, tasks }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (taskName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [taskName]: value,
    }));
  };

  const uploadToDataBase = async (data, form) => {
    try {
      let response = await database.createDocument("64d45c73133d8e39e84d", "64d775e89561f5813b3a", uuidv4(), data)
      console.log("Document creation response:", response);

      form.querySelector("button").innerText = "UPLOADING DONE"      
      return response;
    } catch (error) {
      console.error("Document creation  error:", error);
      throw error;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const motorName = form.querySelector("h2").innerText;

    try {
      await toast.promise(
        () => uploadToDataBase({
          ...formData,
          employeeName: userInfo.name,
          employeeEmail: userInfo.email,
          area: tasks ? tasks[0].area : 'Loading area...',
          motorName: motorName,
        }, form),
        {
          pending: 'Uploading Maintenance Data',
          success: 'Uploaded Successfully 👌',
          error: 'Operation Failed 🤯',
        }
      );
    } catch (error) {
      toast.error(`❌ Operation Failed: ${error.message}`, {
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
  };

  const removeFrequencyWords = (task) => {
    return task.replace(/(?:weekly|daily|quarterly|yearly)/gi, '').trim();
  };

  const inputArray = [];

  for (let i = 0; i < formUIData.totalMotors; i++) {
    const taskList = formUIData.motorName.includes('floor mount')
      ? tasks[0].floorMountTasks
      : tasks[0].tasks;

    const dailyTasks = [];
    const weeklyTasks = [];

    // Split tasks into daily and weekly
    taskList.forEach((element) => {
      if (element.includes('daily')) {
        dailyTasks.push(element);
      } else if (element.includes('weekly')) {
        weeklyTasks.push(element);
      }
    });

    const modifyPlaceholder = (task) => {
      const taskName = removeFrequencyWords(task);
      if (taskName.includes('vibration') || taskName.includes('bearing-noise')) {
        return `${taskName} (Normal/Abnormal)`;
      } else if (taskName.includes('seal-healthiness')) {
        return `${taskName} (Good/Moderate/Damaged)`;
      } else return taskName;
    };

    inputArray.push(
      <form key={i} onSubmit={handleFormSubmit}>
        <h2 style={{ marginTop: '1em' }}>
          {formUIData.motorName} {Math.max(1, Number(formUIData.totalMotors) - i)} Info
        </h2>
        <h3>Daily Tasks:</h3>
        {dailyTasks.map((element, index) => (
          <input
            placeholder={modifyPlaceholder(element)}
            key={index}
            required
            onChange={(e) => handleInputChange(removeFrequencyWords(element), e.target.value)}
          />
        ))}
        {new Date().getDay() === 1 && (
          <div>
            <h3>Weekly Tasks:</h3>
            {weeklyTasks.map((element, index) => (
              <input
                placeholder={modifyPlaceholder(element)}
                key={index}
                required
                onChange={(e) => handleInputChange(removeFrequencyWords(element), e.target.value)}
              />
            ))}
          </div>
        )}
        <button type="submit">Submit Maintenance</button>
      </form>
    );
  }

  return (
    <div className={styles.form}>
      {inputArray}
    </div>
  );
}
