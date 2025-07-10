import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { DeleteApiCall, GetApiCall, PatchApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ProgressBar } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonGrid from '../utils/CommonGrid';
import moment from "moment";
import { IoMdAdd } from "react-icons/io";
import { Card, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FaEquals } from "react-icons/fa";
import { convertInputedToMainFormat } from '../service/TimeFormat';


// import Project from './Projects';

const Project = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [projectTasks, setprojectTasks] = useState([])
  const [project, setproject] = useState([])
  const [projectMembers, setprojectMembers] = useState([])
  const [selectedMember, setselectedMember] = useState([])
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false)
  const [selectedPriority, setselectedPriority] = useState([])
  const [selectedStatus, setselectedStatus] = useState([])
  const [deleteProjectModal, setdeleteProjectModal] = useState(false)
  const [taskData, settaskData] = useState({
    label: "",
    summary: "",
    timeline: null,
    attachement: null,
    // assign_to: "",
  })
  const [errors, setErrors] = useState({
    label: '',
    status: '',
    priority: '',
    timeline: ''
  });

  const [imageData, setimageData] = useState(null)
  const [refresData, setrefresData] = useState(0)
  const projectStatus = [
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
  ]
  // const taskPriority = [
  //   { label: "Low", value: "Low" },
  //   { label: "Normal", value: "Normal" },
  //   { label: "High", value: "High" },
  // ]

  const taskPriority = [
    { label: "High", value: "High", icon: <MdKeyboardArrowUp /> },
    { label: "Normal", value: "Normal", icon: <FaEquals /> },
    { label: "Low", value: "Low", icon: <MdKeyboardArrowDown /> },
  ];
  const headers = ['Task', "Summary", "Status", "Assignee", "Priority", "Due Date", "Reference", "Time Tracking", "Created On"]
  const accessorKey = ['label', "summary", "status", "assign_to", "priority", "due_date", "image", "fake", "createdAt"]
  const [mainDate, setmainDate] = useState([])
  console.log("projectTasks 1::", projectMembers);

  console.log("log of selected status::", selectedStatus);

  useEffect(() => {
    if (projectTasks && projectTasks != []) {
      const updatedData = projectTasks.map((project) => ({
        ...project, // keep other fields
        // priority: project.priority, // assuming this is not a date
        due_date: moment(project.due_date).format("DD-MM-YYYY"),
        createdAt: moment(project.createdAt).format("DD-MM-YYYY hh:MM A"),
        // to get name of mail by id
        // assign_to: projectMembers.map(prj => project.
        //   assign_to._id == prj.value && prj.label)

      }));
      setmainDate(updatedData);
    }
  }, [projectTasks]);

  console.log("location data::", location);
  // console.log("location data::1", location?.state?.project_id);
  const getProjectTask = async () => {
    if (location?.state?.project_id != null) {
      const project_id = location?.state?.project_id
      console.log("im called on audit 1");
      const response = await GetApiCall(`project/${project_id}`)

      // if (data.data.success == true) {

      console.log("single project tasks detail:", response);
      // }


      console.log("im called on audit 2");
      if (response.data.success == true) {
        setprojectMembers(response.data.project.members)
        console.log("im called on audit 3");
        setproject(response.data.project)
        const tResponse = await GetApiCall(`gettasks/${response.data.project._id}`)
        console.log("im called on audit 4", tResponse);
        if (tResponse.data.success == true) {
          console.log("im called on audit 5");
          setprojectTasks(tResponse?.data?.tasks)

          // setrefresData(1)
        }
      }

    }
  }
  useEffect(() => {
    getProjectTask()
  }, [location])


  console.log("projectTasks::", projectTasks);



  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    console.log("log of e ::", e.target);

    if (name == "attachement") {
      settaskData((pre) => ({
        ...pre,
        [name]: e.target.files[0]
      }))
    }
    if (name == "timeline") {
      console.log("log im called on time libne");
      
      let date = new Date().toISOString().split("T")[0]
      if (value < date) {
        settaskData((pre) => ({
          ...pre,
          timeline: null,
        }))
        newErrors.timeline = 'Timeline is wrong!';
        return 0;
      }
      else {
        settaskData((pre) => ({
          ...pre,
          [name]: value,
        }))
      }
    }
    settaskData((pre) => ({
      ...pre,
      [name]: value
    }))
    // }
  }
  const handleMemberChange = (data) => {
    if (data) {
      console.log("handleMemberChange::", data);
      const arrayData = [data]
      console.log("handleMemberChange arrayData::", arrayData);
      setselectedMember(data)
    }
    else {
      setselectedMember([])
    }
  }
  const openCreateTaskModal = () => {
    console.log("im called");

    setisOpenTaskModal(true)
  }
  console.log("im called selectedMember::", selectedMember);
  const toggleTaskModal = () => {
    setisOpenTaskModal(!isOpenTaskModal)
    settaskData({
      label: "",
      summary: "",
      timeline: null,
      attachement: null,
    })
    setErrors({
      label: '',
      status: '',
      priority: '',
      timeline: ''
    });
    setselectedMember([])
    setselectedPriority([])
  }
  console.log("taskData::", taskData);
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      label: '',
      status: '',
      priority: '',
      timeline: ''
    };

    if (!taskData.label.trim()) {
      newErrors.label = 'Task name is required';
      valid = false;
    }

    if (!selectedStatus || !selectedStatus.value) {
      newErrors.status = 'Status is required';
      valid = false;
    }

    if (!selectedPriority || !selectedPriority.value) {
      newErrors.priority = 'Priority is required';
      valid = false;
    }

    if (!taskData.timeline) {
      newErrors.timeline = 'Timeline is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const [isSUbmitClick, setisSUbmitClick] = useState(false)
  const handleCreateTask = async () => {
    console.log("submited members", selectedMember);

    setisSUbmitClick(true)
    if (!validateForm()) {
      return;
    }
    const formData = new FormData()
    formData.append("label", taskData.label)
    formData.append("summary", taskData.summary)
    formData.append("status", selectedStatus.value)
    formData.append("priority", selectedPriority.value)
    formData.append("due_date", taskData.timeline)
    // formData.append("assign_to", selectedMember.value)
    formData.append("assign_to", selectedMember ? JSON.stringify(selectedMember) : [])
    formData.append("image", imageData)
    // const payload = {
    //   label: taskData.label,
    //   summary: taskData.summary,
    //   status: selectedStatus.value,
    //   priority: selectedPriority.value,
    //   due_date: taskData.timeline,
    //   assign_to: selectedMember.value,
    //   image: imageData,

    // }
    // console.log("log of payload::", payload);

    const project_id = location?.state?.project_id
    let response = null;
    if (EditId !== null) {
      response = await PatchApiCall(`task_u/${EditId}`, formData);
      setEditId(null)
    }
    else {
      response = await PostApiCall(`createtask/${project_id}`, formData)
    }
    console.log("response of createtask::", response);
    if (response.success == true) {
      console.log("im called true");

      toast.success(response.msg, "")
      settaskData({
        label: "",
        summary: "",
        timeline: null,
        attachement: null,
        // assign_to: "",
      })
      setselectedStatus([])
      setselectedPriority([])
      setselectedMember([])
      setisOpenTaskModal(false)
      setErrors({
        label: '',
        status: '',
        priority: '',
        timeline: ''
      });
      getProjectTask()
    }
    else {
      toast.success(response.msg, "")
    }
    setisSUbmitClick(false);
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
    const dResponse = await DeleteApiCall(`project_d/${projectId}`)
    console.log("dResponse ::", dResponse);
    if (dResponse.success == true) {
      navigate("../projects")
    }

  }
  const [EditId, setEditId] = useState(null)
  // const getedtidata = async (id) => {
  //   setEditId(id)
  //   const tResponse = await GetApiCall(`gettask/${id}`)
  //   console.log("edit data resposen::", tResponse);
  //   if (tResponse.data.success == true) {
  //     const data = tResponse.data.task
  //     settaskData({
  //       label: data.label,
  //       summary: data.summary,
  //       timeline: data.due_date,
  //       attachement: data.image,
  //       // assign_to: projectMembers.map(prj => prj.value == data.assign_to && prj.label),
  //     })
  //     setselectedPriority(data.priority)
  //     setselectedStatus(data.status)
  //     setselectedMember(projectMembers.map(prj => prj.value == data.assign_to && prj.label))
  //     setisOpenTaskModal(true)
  //   }
  // }
  const getedtidata = async (id) => {
    setEditId(id);
    const tResponse = await GetApiCall(`gettask/${id}`);
    console.log("edit data resposen::", tResponse);
    if (tResponse.data.success == true) {
      const data = tResponse.data.task;

      // Find the member object that matches the assign_to ID
      const assignedMember = projectMembers.find(prj => prj.value === data?.assign_to);
      console.log("get members from db::", assignedMember);

      settaskData({
        label: data.label,
        summary: data.summary,
        timeline: data.due_date.split('T')[0], // Format date for input field
        attachement: data.image,
      });

      // Set the dropdown values properly
      setselectedPriority(taskPriority.find(opt => opt.value === data.priority) || null);
      setselectedStatus(projectStatus.find(opt => opt.value === data.status) || null);
      setselectedMember(assignedMember || null);

      setisOpenTaskModal(true);
    }
  };
  const handleDelete = async (id) => {
    console.log("log of delete id::", id);
    const dresponse = await DeleteApiCall(`task_d/${id}`)
    console.log("log of delete dresponse::", dresponse);
    if (dresponse.success == true) {
      toast.success(dresponse.msg, " ")
      getProjectTask()
    }
  }
  const [TimeModal, setTimeModal] = useState(false)
  const [TimeId, setTimeId] = useState(null)
  const handleTimeTrackingModal = (id) => {
    setTimeId(id)
    setTimeModal(true)
  }
  const toggleTimeModal = () => {
    setTimeId(null)
    setTimeModal(false)
  }
  const [TimeTrack, setTimeTrack] = useState(null)
  const [isValid, setisValid] = useState(false)
  console.log("TimeTrack::", TimeTrack);

  // const handleTimeTrackingChange = (data) => {
  //   console.log("log of time::", data);
  //   const trimmedTime = data.trim().toLowerCase()
  //   if (trimmedTime == "") {
  //     setTimeTrack(null)
  //     setisValid(false)
  //     return;
  //   }
  //   else {
  //     const formattedTime = convertInputedToMainFormat(trimmedTime)
  //     // const parts = trimmedTime.split(/\s+/);
  //     // const validPartRegex = /^(\d+)([mhdw])$/;
  //     // let totalMinutes = 0

  //     // for (const part of parts) {
  //     //   const match = part.match(validPartRegex)
  //     if (!formattedTime) {
  //       // console.log("log of time else ::", match);
  //       setTimeTrack(null)
  //       setisValid(false)
  //       return;
  //     }
  //     else {
  //       setisValid(false)
  //       setTimeTrack(formattedTime.trim());
  //     }
  //   }
  //   //   console.log("log of time match ::", match);
  //   //   setisValid(true)
  //   //   const value = parseInt(match[1], 10)
  //   //   const unit = match[2]
  //   //   switch (unit) {
  //   //     case 'm':
  //   //       totalMinutes += value
  //   //       break;
  //   //     case 'h':
  //   //       totalMinutes += value * 60
  //   //       break;
  //   //     case 'd':
  //   //       totalMinutes += value * 60 * 24;
  //   //       break;
  //   //     case 'w':
  //   //       totalMinutes += value * 60 * 24 * 7;
  //   //       break;
  //   //   }
  //   // }
  //   // const weeks = Math.floor(totalMinutes / (7 * 24 * 60))
  //   // totalMinutes %= (7 * 24 * 60)
  //   // const days = Math.floor(totalMinutes / (24 * 60))
  //   // totalMinutes %= (24 * 60)
  //   // const hours = Math.floor(totalMinutes / (60))
  //   // const minutes = totalMinutes % 60;
  //   // let formattedTime = "";
  //   // if (weeks > 0) formattedTime += `${weeks}w `;
  //   // if (days > 0) formattedTime += `${days}d `;
  //   // if (hours > 0) formattedTime += `${hours}h `;
  //   // if (minutes > 0) formattedTime += `${minutes}m`;

  //   // console.log("log of time week::", week);
  // }

  const [dbHour, setdbHour] = useState(0)
  const handleTimeTrackingChange = (data) => {
    const result = convertInputedToMainFormat(data)
    console.log("log of results::", result);

    if (!result.isValid) {
      setTimeTrack(null);
      setisValid(false);
      return;
    }
    setTimeTrack(result.formatted);
    setdbHour(result.totalHour);
    setisValid(true);
  }
  const handleTimeTrackingSave = async () => {
    // console.log("data save::", data);
    const formData = {
      // time_spent: TimeTrack
      time_spent: dbHour
    }
    const response = await PatchApiCall(`task_u/${TimeId}`, formData);
    console.log("time track response::", response);
    setTimeId(null)
    setTimeModal(false)
    setisValid(false)
    getProjectTask()
  }
  const [opemImageModal, setopemImageModal] = useState(false)
  const [imageView, setimageView] = useState(null)
  const handleImageReference = (data) => {
    console.log("im caleld handleImageReference::", data);
    setimageView(data)
    setopemImageModal(true)
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
            <span style={{ fontWeight: "bold", color: "#333" }}>Project: </span>
            {project?.project_name}
          </div>
          <div>
            <CDropdown>
              <CDropdownToggle>
                <span style={{ fontWeight: "bold", color: "#333" }}>Members: </span>
              </CDropdownToggle>
              <CDropdownMenu>
                {projectMembers.map((member, index) => (
                  <CDropdownItem key={member.value}>

                    <img src={import.meta.env.VITE_API_URL_USER + member.icon} height="30px" width="30px" style={{ borderRadius: "50%" }} />
                    {member.label}
                    {index < projectMembers.length - 1 && ", "}

                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </div>
          {project?.is_star == 1 &&
            <div>
              <p style={{
                // margin: 0,
                fontSize: "16px", position: "absolute",
                // top: "27px",
                // right: "74px"
              }}>
                <span style={{ fontWeight: "bold", color: "#333" }}><FontAwesomeIcon icon={faStar} /> </span>

              </p>
            </div>
          }
          <div>

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

        </div>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "5px 5px "
        }}>

          <button type="button" class="btn btn-primary waves-effect waves-light" onClick={openCreateTaskModal}><IoMdAdd /> Add Task</button>
          {/* <Button > Create Task</Button> */}
        </div>
        <CommonGrid
          headers={headers}
          accessorKey={accessorKey}
          data={mainDate}
          allowEdit={1}
          allowDelete={1}
          handleDelete={handleDelete}
          getedtidata={getedtidata}
          handleImageReference={handleImageReference}
          handleTimeTrackingModal={handleTimeTrackingModal}
        />
      </Card>

      {/* time modal */}
      <Modal show={TimeModal} onHide={toggleTimeModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Time Tracking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValid &&
            <Row className='mb-2'>
              <Col>

                <ProgressBar now={100} label={`${TimeTrack}`} />

              </Col>
            </Row>
          }
          <Row className='mb-2'>
            <Col>
              <label>Time spent</label>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <input className='form-control' type="text" onChange={(e) => handleTimeTrackingChange(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <div>
              <p className='mb-2'>Use the format: <span style={{ color: "orange", fontWeight: "bold" }}>2w 3d 7h 15m</span></p>
              <ul>
                <li><span style={{ fontWeight: "bold" }}>w</span> = weaks</li>
                <li><span style={{ fontWeight: "bold" }}>d</span> = days</li>
                <li><span style={{ fontWeight: "bold" }}>h</span> = hours</li>
                <li><span style={{ fontWeight: "bold" }}>m</span> = minutes</li>
              </ul>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={toggleTimeModal} class="btn btn-danger waves-effect waves-light">Cancel</button>
          <button type="button" disabled={!isValid} class={isValid ? "btn btn-success waves-light" : "btn btn-light waves-effect"} onClick={handleTimeTrackingSave}>Save</button>
          {/* <Button variant={isValid ? "success" : "light"} onClick={handleTimeTrackingSave}> */}

          {/* </Button> */}
          {/* <Button variant="danger" > */}

          {/* </Button> */}
        </Modal.Footer>
      </Modal>
      <Modal show={isOpenTaskModal} onHide={() => toggleTaskModal()}>
        {/* isOpenTaskModal */}
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label isStar">Task Name</label>
                <input type="text" name="label" value={taskData.label} className={`form-control ${errors.label ? 'is-invalid' : ''}`} placeholder="Enter task name" onChange={(e) => handleTaskChange(e)} />
                {errors.label && <div className="invalid-feedback">{errors.label}</div>}
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
                  isClearable={true}
                  onChange={(e) => handleMemberChange(e)}
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {<img src={import.meta.env.VITE_API_URL_USER + e.icon} height="30px" width="30px" style={{ borderRadius: "50%" }} />}
                      {e?.label}
                    </div>
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-3'>
                <label className='form-label isStar'>Priority</label>
                <Select
                  options={taskPriority}
                  value={selectedPriority}
                  isMulti={false}
                  className={`${errors.priority ? 'is-invalid' : ''}`}
                  onChange={(e) => handlePriorityChange(e)}
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "orange" }}>{e.icon}</span>
                      {e.label}
                    </div>
                  )}
                />
                {errors.priority && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.priority}</div>}
              </div>

            </Col>

          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label isStar">Timeline</label>
                <input type="date" name="timeline" className={`form-control ${errors.timeline ? 'is-invalid' : ''}`} onChange={(e) => handleTaskChange(e)} value={taskData.timeline} min={new Date().toISOString().split('T')[0]} />
                {errors.timeline && <div className="invalid-feedback">{errors.timeline}</div>}
              </div>
            </Col>
            <Col>
              <div>
                <label className='form-label isStar'>Status</label>
                <Select
                  options={projectStatus}
                  value={selectedStatus}
                  isMulti={false}
                  className={`${errors.status ? 'is-invalid' : ''}`}
                  onChange={(e) => handleStatusChange(e)}
                />
                {errors.status && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.status}</div>}
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label">Timeline</label>
                <input type="date" name="timeline" className="form-control" onChange={(e) => handleTaskChange(e)} value={taskData.timeline} min={new Date().toISOString().split('T')[0]} />
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <div className="mb-3">
                <label className="form-label">Attachment</label>
                <input type="file" accept=".png, .jpg, .jpeg" name="attachement" onChange={(e) => setimageData(e.target.files[0])} className="form-control" />
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <button type="button" class={"btn btn-danger success waves-light"} onClick={toggleTaskModal}>Cancel</button>
          {/* <Button variant="secondary" onClick={() => setisOpenTaskModal(false)}>
            Cancel
          </Button> */}
          <button type="button" class={"btn btn-success waves-light"} onClick={handleCreateTask}>{EditId ? "Update" : "Save"}</button>
          {/* <Button variant="primary" onClick={handleCreateTask}>
            {EditId ? "Update" : "Create"}
          </Button> */}
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
      <Modal show={opemImageModal} onHide={() => setopemImageModal(false)} centered size="lg">
        <ModalHeader closeButton>Reference Attachment</ModalHeader>
        <ModalBody>
          <img
            src={`${import.meta.env.VITE_API_URL_IMAGE}${imageView}`}
            alt="Task Image"
            style={{ width: "767px", height: "350px", objectFit: "fill" }}
          />
        </ModalBody>
        {/* <ModalFooter> */}
        {/* <Button className='btn btn-success'>Cancel</Button>
          <Button className='btn btn-danger'>Delete</Button> */}
        {/* </ModalFooter> */}
      </Modal >
    </>
  );
};

export default Project;


