import './global.css'
import styles from './App.module.css'
import { Header } from './components/Header'
import { FormNew } from './components/FormNew'
import { useState } from 'react'

import ClippboardIcon from './assets/Clipboard.svg'
import TrashIcon from './assets/trash.svg'
import CheckIcon from './assets/check.svg'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isActive, setIsActive] = useState(false)
  const [concluidas, setConcluidas] = useState('0')

  function handleCreateNewTask(title: string){
    if(title === ''){
      return
    }
    
    const data = {
        id: new Date().getTime(),
        title: title,
        done: false
    }

    let stateAfterChanged = [...tasks, data]

    stateAfterChanged.length === 0 ? setIsActive(false) : setIsActive(true)

    setTasks([...tasks, data])
    handleCountConcluidas(stateAfterChanged)
  }

  function handleDeleteTask(taskId: number){
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId
    })

    tasksWithoutDeletedOne.length === 0 ? setIsActive(false) : setIsActive(true)

    setTasks(tasksWithoutDeletedOne)
    handleCountConcluidas(tasksWithoutDeletedOne)
  }

  function handleDoneTask(taskId: number){
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === taskId)

    if(!foundItem)
      return;
    
    foundItem.done = !foundItem.done

    setTasks(updatedTasks)
    handleCountConcluidas(updatedTasks)
  }

  function handleCountConcluidas(tasksArray: Task[]){
    console.log(tasksArray)
    const tasksDone = tasksArray.filter(task => {
      return task.done !== false
    })

    const strDoneTasks = tasksArray.length > 0 ? `${tasksDone.length} de ${tasksArray.length}` : '0'

    setConcluidas(strDoneTasks)
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
            <span className={styles.countTask}>{concluidas}</span>
          </div>
        </div>

        <div className={styles.cardList}>
          {
            isActive ? (
              <div>
                {tasks.map(task => (
                  <div className={styles.taskCard} key={task.id}>
                    <div className={styles.divStatus}>
                      {
                        task.done ? (
                          <button type="button" className={styles.button} onClick={() => handleDoneTask(task.id)}>
                            <div className={styles.completed}>
                              <img src={CheckIcon} alt="check icon"/>
                            </div>
                          </button>
                        ) :
                        (
                          <button type="button" className={styles.button} onClick={() => handleDoneTask(task.id)}>
                            <div className={styles.notCompleted}>
                              .
                            </div>
                          </button>
                        )
                      }
                    </div>
                    <span style={ task.done ? { textDecoration: 'line-through', color: 'var(--gray-300)' } : {}}>{task.title}</span>
                    <div className={styles.divTrash}>
                      <button type="button" className={styles.button} onClick={() => handleDeleteTask(task.id)}>
                          <img src={TrashIcon} alt="trash icon"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.listEmpty}>
                <img src={ClippboardIcon} alt="Cipboard icon" style={{marginBottom: '1rem'}}/>
                <span style={{ fontWeight: 'bold' }}>Você ainda não tem tarefas cadastradas</span>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
