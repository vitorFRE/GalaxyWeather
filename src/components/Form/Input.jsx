import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, name }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} />
    </div>
  );
};

export default Input;
