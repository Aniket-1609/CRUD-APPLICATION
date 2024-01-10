import React,{useEffect,useState} from 'react'
import {db} from '../services/firebase.config'
import { doc,addDoc, collection,deleteDoc,getDocs } from 'firebase/firestore'
import EditTask from './EditTask'

const Task = () => {

  const [tasks,setTasks]=useState([])
  const [createTask,setCreateTask]=useState("")
  const [checked,setChecked]=useState()
  const collectionRef=collection(db,'tasks')

  useEffect(()=>{
    const getTasks=async()=>{
      await getDocs(collectionRef).then((task)=>{
        let tasksData= task.docs.map((doc)=>({...doc.data(),id:doc.id}))
        setTasks(tasksData)
      }).catch((err)=>{
        console.log(err);
      })
    }
    getTasks()
  },[])
  

  const deleteTask = async(id) =>{
    try{
      window.confirm('Are you sure you want to delete the task?')
     const documentRef=doc(db,'tasks',id)
      await deleteDoc(documentRef)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
  }
  //add task handler
  const submitTask=async(e)=>{
    e.preventDefault();

    try{
      await addDoc(collectionRef,{
        task:createTask,
        isChecked:false,
      })
    }
    catch(err){
      console.log(err)
    }

    console.log(createTask);
  }

  const checkBoxHandler=async(event)=>{
    console.log(event.target.name)
    setChecked(state=>{
      const index=state.findIndex(checkbox=>checkbox.id.toString()===event.target.name)

      let newState=state.slice()
    })
  }
  console.log("tasks",tasks);
  return (
    <div className='container'>
      <div className='row col-md-12'>
        <div className='card card-white'>
          <div className='card-body'>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
               Add Task
            </button>

            {tasks.map(({task,id,isChecked})=>
              <div className='todo-list' key={id}>

                <div className='todo-item'>
                  <hr/>
                  <span>
                    <div className='checker'>
                      <span>
                        <input type='checkbox'
                        defaultValue={isChecked}
                        onChange={(event)=>checkBoxHandler(event)}
                        name={id}
                        />
                      </span>
                    </div>
                    &nbsp;{task}
                  </span>
                  <span className='float-end mx-3'>
                    <EditTask task={task} id={id}/>
                  </span>
                  
                  <button type='button' className='btn btn-danger float-end'
                  onClick={()=> deleteTask(id)}>Delete Task</button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      
          <div className="modal fade" id="addTask" tabIndex="-1" aria-labelledby="addTaskLabel" aria-hidden="true">
            <div className="modal-dialog">
            <form className='d-flex' onSubmit={submitTask}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addTaskLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    
                      <input type='text' 
                      className='form-cantrol' 
                      placeholder='Add a Task'
                      onChange={e=>setCreateTask(e.target.value)}/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

    </div>
  )
}

export default Task
