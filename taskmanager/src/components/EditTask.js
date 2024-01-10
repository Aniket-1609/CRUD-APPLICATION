
import React,{useState} from 'react'
import {db} from '../services/firebase.config'
import { doc, updateDoc } from 'firebase/firestore'

const EditTask = ({task,id}) => {
  console.log(task,id)

  const [updatedTask,setUpdatedTask]=useState([task])

  const updateTask =async(e)=>{
    e.preventDefault()
    try{
      const tasksDocument=doc(db,'tasks',id)
      await updateDoc(tasksDocument,{
        task:updatedTask,
        isChecked:false
      })
      window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`id${id}`}>
               Update Task
     </button>



      <div className="modal fade" id={`id${id}`} tabIndex="-1" aria-labelledby="updateTaskLabel" aria-hidden="true">
            <div className="modal-dialog">
            <form className='d-flex' >
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="updateTaskLabel">Update Task</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    
                      <input type='text' 
                      className='form-cantrol' 
                      placeholder='Update Task'

                      defaultValue={updatedTask}
                      onChange={e=>setUpdatedTask(e.target.value)}
                      />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"
                    onClick={e=>updateTask(e)}
                    >Update Task</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

    </div>
  )
}

export default EditTask
