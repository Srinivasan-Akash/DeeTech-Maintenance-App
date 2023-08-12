import React from 'react';
import styles from '@/styles/EmployeeForm.module.css';

export default function EmployeeForm({ formUIData, tasks }) {
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

    inputArray.push(
      <div key={i}>
        <h2 style={{ marginTop: '1em' }}>
          {formUIData.motorName} {Number(formUIData.totalMotors) - i} Info
        </h2>
        <h3>Daily Tasks:</h3>
        {dailyTasks.map((element, index) => (
          <input placeholder={element} key={index} />
        ))}
        {new Date().getDay() === 1 && (
          <div>
            <h3>Weekly Tasks:</h3>
            {weeklyTasks.map((element, index) => (
              <input placeholder={element} key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.form}>
      {inputArray}
      <button>Submit Maintenance</button>
    </div>
  );
}