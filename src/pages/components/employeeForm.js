import React from 'react'
import styles from '@/styles/EmployeeForm.module.css';

export default function employeeForm({ tasks }) {
  return (
    <div className={styles.form}>
      {tasks[0].tasks.map((element, index) => (
        <input placeholder={element} key={index} />
      ))}
      <button>Submit Maintenance</button>
    </div>
  )
}
