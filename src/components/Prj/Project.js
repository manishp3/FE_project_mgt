import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeletepiCall, GetApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button, Modal } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonGrid from '../utils/CommonGrid';
import { Card, Col, Row } from 'reactstrap';


// import Project from './Projects';

const Project = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [projectTasks, setprojectTasks] = useState([])
  const [project, setproject] = useState([])
  const [projectMembers, setprojectMembers] = useState([])
  const [selectedMember, setselectedMember] = useState([])
  const projectStatus = [
    { label: "T0 Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
  ]
  const taskPriority = [
    { label: "Low", value: "Low" },
    { label: "Normal", value: "Normal" },
    { label: "High", value: "High" },
  ]




  console.log("location data::", location);
  // console.log("location data::1", location?.state?.project_id);
  useEffect(() => {
    const getProjectTask = async () => {
      if (location?.state?.project_id != null) {
        const project_id = location?.state?.project_id
        const response = await GetApiCall(`project/${project_id}`)
        console.log("single project tasks detail:", response);
        setprojectMembers(response.data.project.members)
        setproject(response.data.project)

        if (response.data.success == true) {
          const tResponse = await GetApiCall(`gettasks/${response.data.project._id}`)
          if (tResponse.data.success == true) {
            setprojectTasks(tResponse.data.tasks)
          }
        }

      }
    }
    getProjectTask()
  }, [location])

  useEffect(() => {
    if (projectTasks.length > 0) {

    }
  }, [projectTasks])

  console.log("projectTasks::", projectMembers);

  const headers = ['Task', "Summary", "Status", "Priority", "Due Date", "Reference", "Created On"]
  const accessorKey = ['label', "summary", "status", "priority", "due_date", "image", "createdAt"]
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false)
  const [selectedPriority, setselectedPriority] = useState([])
  const [selectedStatus, setselectedStatus] = useState([])
  const [deleteProjectModal, setdeleteProjectModal] = useState(false)
  const [taskData, settaskData] = useState({
    label: "",
    summary: "",
    timeline: null,
    attachement: null,
    assign_to: "",
  })
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    if (name == "attachement") {
      settaskData((pre) => ({
        ...pre,
        [name]: e.target.files[0]
      }))
    }
    settaskData((pre) => ({
      ...pre,
      [name]: value
    }))
    // }
  }
  const handleMemberChange = (data) => {
    setselectedMember(data)
  }
  const openCreateTaskModal = () => {
    console.log("im called");

    setisOpenTaskModal(true)
  }
  console.log("im called::", isOpenTaskModal);
  const toggleTaskModal = () => {
    setisOpenTaskModal(!isOpenTaskModal)
    settaskData({
      label: "",
      summary: "",
      timeline: null,
      attachement: null,
    })
  }
  const handleCreateTask = async () => {
    const payload = {
      label: taskData.label,
      summary: taskData.summary,
      status: selectedStatus.value,
      priority: selectedPriority, value,
      due_date: taskData.timeline,
      assign_to: null,

    }
    const project_id = location?.state?.project._id
    console.log("handleCreateTask paylaod::", payload);
    const response = await PostApiCall(`createtask/${project_id}`)
    console.log("response of createtask::", response);

  }
  const handlePriorityChange = (data) => {
    console.log("");
    setselectedPriority(data)

  }
  const handleStatusChange = (data) => {

    console.log("");
    setselectedStatus(data)
  }
  console.log("log og projeect::", project);
  const handleDeleteProject = async () => {
    let projectId = project._id
    const dResponse = await DeletepiCall(`project_d/${projectId}`)
    console.log("dResponse ::", dResponse);
    if (dResponse.success == true) {
      navigate("../projects")
    }

  }

  const getedtidata = () => {
    console.log();
  }
  const handleDelete = () => {
    console.log();

  }

  return (
    <>
      <Card>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "16px 24px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: "16px" }}>
              <span style={{ fontWeight: "bold", color: "#333" }}>Project: </span>
              {project?.project_name}
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              <span style={{ fontWeight: "bold", color: "#333" }}>Members: </span>
              {projectMembers.map((member, index) => (
                <span key={member.value}>
                  {member.label}
                  {index < projectMembers.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
          <button style={{ border: "none" }}>
            <FontAwesomeIcon
              onClick={() => setdeleteProjectModal(true)}
              title='Delete Project'
              icon={faTrash}
              style={{
                color: "red",
                fontSize: "20px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </button>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "5px"
        }}>
          <Button onClick={openCreateTaskModal}>Create Task</Button>
        </div>
        <CommonGrid
          headers={headers}
          accessorKey={accessorKey}
          data={projectTasks}
          allowEdit={1}
          allowDelete={1}
          handleDelete={handleDelete}
          getedtidata={getedtidata}
        />
      </Card>

      <Modal show={isOpenTaskModal} onHide={() => toggleTaskModal()}>
        {/* isOpenTaskModal */}
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input type="text" name="label" value={taskData.label} className="form-control" placeholder="Enter task name" onChange={(e) => handleTaskChange(e)} />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="summary" className="form-control" rows="2" placeholder="Enter description" onChange={(e) => handleTaskChange(e)} value={taskData.summary} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-3'>
                <label className='form-label'>Assign To</label>
                <Select
                  options={projectMembers}
                  value={selectedMember}
                  isMulti={false}
                  onChange={(e) => handleMemberChange(e)}

                />
              </div>
            </Col>
            <Col>
              <div className='mb-3'>
                <label className='form-label'>Priority</label>
                <Select
                  options={taskPriority}
                  value={selectedPriority}
                  isMulti={false}
                  onChange={(e) => handlePriorityChange(e)}

                />
              </div>

            </Col>

          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label">Timeline</label>
                <input type="date" name="timeline" className="form-control" onChange={(e) => handleTaskChange(e)} value={taskData.timeline} />
              </div>
            </Col>
            <Col>
              <div>
                <label className='form-label'>Status</label>
                <Select
                  options={projectStatus}
                  value={selectedStatus}
                  isMulti={false}
                  onChange={(e) => handleStatusChange(e)}
                />
              </div>
            </Col>

          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label">Attachment</label>
                <input type="file" name="attachement" onChange={(e) => handleTaskChange(e)} className="form-control" accept=".png .jpg .jpeg" />
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setisOpenTaskModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal >
      <Modal show={deleteProjectModal} onHide={() => setdeleteProjectModal(false)} centered>
        <Modal.Body style={{ textAlign: "center", padding: "30px" }}>
          {/* Warning SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="orange"
            className="bi bi-exclamation-triangle-fill mb-3"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2.002 0 1 1 0 0 1 2.002 0z" />
          </svg>

          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Are you sure you want to delete this project?
          </h5>


          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
            <Button variant="secondary" onClick={() => setdeleteProjectModal(false)} >
              Exit
            </Button>
            <Button variant="danger" onClick={handleDeleteProject}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Project;


