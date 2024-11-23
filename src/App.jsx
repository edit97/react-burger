import React from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/AppHeader";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
    </div>
  );
}

export default App;
