import styles from './FormNew.module.css'

import todoLogo from '../assets/plus.svg'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Task } from '../App'

interface Props {
    handleCreateNewTask: (title: string) => void;
}

export function FormNew({ handleCreateNewTask }: Props){
    const [newTask, setNewTask] = useState('')

    function handleCreateNewToDo(event: FormEvent){
        event.preventDefault()

        handleCreateNewTask(newTask)

        setNewTask('')
    }

    function handleTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setNewTask(event.target.value)
    }

    return (
        <form onSubmit={handleCreateNewToDo} className={styles.todoForm}>
            <input 
                type="text" 
                className={styles.input}
                placeholder="Adicione uma nova tarefa"
                value={newTask}
                onChange={handleTaskChange}
            />
            
            <button type="submit" className={styles.buttonSubmit}>
                Criar
                <img src={todoLogo} alt="Logotipo do ToDo" style={{marginLeft: '0.5rem'}}/>
            </button>
        </form>
    )
}