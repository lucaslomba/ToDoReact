import './global.css'
import styles from './App.module.css'
import { Header } from './components/Header'
import { FormNew } from './components/FormNew'
import { useState } from 'react'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleCreateNewTask(title: string){
    const data = {
        id: new Date().getTime(),
        title: title,
        done: false
    }

    setTasks([...tasks, data])
  }

  return (
    <>
      <Header/>
      <FormNew handleCreateNewTask={handleCreateNewTask}/>

      <div className={styles.wrapper}>
        <div className={styles.headerList}>
          <div className={styles.divCounter}>
            <span className={styles.countLabelBlue}>Tarefas criadas</span>
            <div className={styles.countTask}>{tasks.length}</div>
          </div>
          <div className={styles.divCounter}>
            <span className={styles.countLabelPurple}>Concluídas</span>
            <span className={styles.countTask}>0</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
