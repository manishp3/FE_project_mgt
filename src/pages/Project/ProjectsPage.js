import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { DeleteApiCall, GetApiCall, PatchApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
import { toast } from 'react-toastify';
import { Prev } from 'react-bootstrap/esm/PageItem';
// import Project from './Projects';

const ProjectsPage = () => {
  const navigate = useNavigate()
  const [isCreateProjectModalOpen, setisCreateProjectModalOpen] = useState(false)
  const [iscreateProjectDisabled, setiscreateProjectDisabled] = useState(false)

  const [projectData, setprojectData] = useState({
    projectname: ""
  })
  const handleProjectChange = (e) => {

    const { name, value } = e.target;
    setprojectData((pre) => ({
      ...pre,
      [name]: value
    }))
  }
  const [Members, setMembers] = useState([])
  const [ProjectMembers, setProjectMembers] = useState([])
  const [AllProjects, setAllProjects] = useState([])
  // const [projectMember_id, setprojectMember_id] = useState(null)
  async function getProjectsDetails() {
    const response = await GetApiCall(`projects?type=A`);
    setAllProjects(response.data.projects)
    console.log("getProjectsDetails data::", response);
    // return response;
  }
  console.log("getProjectsDetails data::users", AllProjects);
  async function getMembersDetails() {
    const data = await GetApiCall("users");
    // return data;
    // setMembers(data.data.user.map(user=>user.email))
    setMembers(data?.data?.user)
  }
  useEffect(() => {

    getProjectsDetails()
    getMembersDetails()

  }, [])
  console.log("all members otpon::", Members);


  console.log("setisCreateProjectModalOpen", isCreateProjectModalOpen);
  const openCreateProjectModal = () => {
    setiscreateProjectDisabled(false)
    setisCreateProjectModalOpen(true)
    console.log("openCreateProjectModal");
  }

  const handleCreateProject = async () => {
    // const mapIds = ProjectMembers.map((id) => (
    //   id.value
    // ))
    let valid = true;
    if (projectData.projectname == "") {
      toast.error("Please Enter Project name!")
      valid = false
    }
    if (ProjectMembers.length < 1) {
      toast.error("Please Select Project Member!")
      valid = false
    }

    if (!valid) return 0;
    setiscreateProjectDisabled(true)
    const payload = {
      project_name: projectData.projectname,
      members: ProjectMembers
    }
    console.log("payload of crete project;::", payload);

    const resp = await PostApiCall("project_c/", payload)
    console.log("respopnse of create project::", resp);
    if (resp.success == true) {
      toast.success(resp.msg, " ")
    } else {
      toast.error(resp.msg, " ")
    }
    setprojectData({
      projectname: "",
    })
    setiscreateProjectDisabled(false);
    setProjectMembers([])
    setisCreateProjectModalOpen(false);
    console.log("respopnse of create project::1", resp);

    getProjectsDetails()
  }
  console.log("prokect members::", ProjectMembers);

  const createModalToggle = () => {
    setisCreateProjectModalOpen(false)
    setisEdit(0)
    setprojectId("")
    setprojectData({
      projectname: ""
    })
    setProjectMembers([])
  }
  function handleprojectMemberChange(data) {
    console.log("prokect members::dd", data);
    let sop = "";
    setProjectMembers(data);

  }
  const [projectId, setprojectId] = useState(null)
  console.log("AllProjects data::", AllProjects);
  const handleProjectStar = async (project) => {
    console.log("project data::", project);
    const payload = {
      is_star: project.is_star == 1 ? 0 : 1
    }
    console.log("ProjectIds data::123", payload);

    const uresponse = await PatchApiCall(`project_u/${project._id}`, payload)
    console.log("response edit ::", uresponse);
    if (uresponse.success == true) {
      getProjectsDetails()
    }

  }
  const [deleteProjectModal, setdeleteProjectModal] = useState(false)
  console.log("Called on delte::", deleteProjectModal);
  const handleOpenDeleteModal = (id) => {
    console.log("Called on delte");

    setprojectId(id)
    setdeleteProjectModal(true)
  }
  const handleProjectDelete = async () => {
    console.log("AllProjects data::", AllProjects);
    const dresponse = await DeleteApiCall(`project_d/${projectId}`)
    console.log("log of dresponse::", dresponse);
    if (dresponse.success == true) {
      getProjectsDetails()
    }
    setprojectId(null)
    setdeleteProjectModal(false)

  }
  const handleProjectEdit = async () => {
    console.log("ProjectIds data projectdata::", projectData);
    let valid = true
    if (projectData.projectname == "") {
      toast.error("Please Enter Project name!")
      valid = false
    }
    else if (ProjectMembers.length < 1) {

      toast.error("Please Select Project member!")
      valid = false
    }
    if (!valid) return;
    setiscreateProjectDisabled(true)
    const payload = {
      project_name: projectData.projectname,
      // members: ProjectMembers.map(e => e.value)
      members: ProjectMembers
    }
    console.log("ProjectIds data::123", payload);

    const uresponse = await PatchApiCall(`project_u/${projectId}`, payload)
    console.log("response edit ::", uresponse);
    if (uresponse.success == true) {
      toast.success(uresponse.msg)
      getProjectsDetails()
    }
    setiscreateProjectDisabled(false)
    setisEdit(0)
    setprojectId(null)
    setisCreateProjectModalOpen(false)

  }
  const [isEdit, setisEdit] = useState(0)
  const handleOpenEditModal = async (id) => {
    console.log("ProjectIds data::oepn", id);

    const eresponse = await GetApiCall(`project/${id}`)
    console.log("eresponse::", eresponse);
    const data = eresponse.data.project
    setprojectData((pre) => ({
      ...pre,
      projectname: data.project_name
    }))
    setisEdit(1)
    setprojectId(id)
    setProjectMembers(data.members)
    setiscreateProjectDisabled(false)
    setisCreateProjectModalOpen(true)
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button onClick={openCreateProjectModal} style={{ border: "none" }} title='Create project'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#405189"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </button>


      </div>

      {AllProjects.length < 1 ?
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> <p style={{ color: "red" }}>No Project Found !</p></div>
        :
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {AllProjects?.map((project, index) => (
            <div
              title="Go to Project"
              key={index}
              style={{
                height: "150px",
                width: "300px",
                backgroundColor: "#fff", // soft hover color
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                position: "relative",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                display: "grid",
                // gridTemplateRows:"2px",
                gap: "10px"
                // flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                {/* <CDropdown variant="nav-item"> */}
                <CDropdown>
                  <CDropdownToggle className="py-0 pe-0 border-0 bg-transparent" caret={false}>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </CDropdownToggle>
                  <CDropdownMenu className="pt-0" placement="bottom-end">
                    <CDropdownItem onClick={() => handleOpenEditModal(project._id)}>edit</CDropdownItem>
                    <CDropdownItem onClick={() => handleOpenDeleteModal(project._id)}>Delete</CDropdownItem>
                    <CDropdownItem onClick={() => handleProjectStar(project)}>{project.is_star == 1 ? "Unstar Project" : "Star Project"}</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div onClick={() => navigate("project", { state: { project_id: project._id } })}>
                <p style={{ margin: 0 }}>Project Name :{project?.project_name.length > 10 ? project?.project_name.slice(0, 17) : <span style={{ fontWeight: 500 }}> {project?.project_name}</span>}</p>
                <p>Total Tasks: {project?.total_task}</p>
                <p> <span style={{ paddingRight: "10px" }}>Members:</span>
                  {
                    project?.members.length > 0 && project.members.map((member, index) =>
                      <img src={import.meta.env.VITE_API_URL_USER + member.icon} key={index} height="30px" width="30px" style={{ borderRadius: "50%", border: "1px solid gray", zIndex: project.members.length - index, position: "relative", marginLeft: index == 0 ? "-5px" : "-10px" }} title={member.label} />
                    )}</p>

              </div>

              <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                <FontAwesomeIcon icon={faFolderOpen} size="2x" color="#f0ad4e" />
              </div>
            </div>
          ))
          }
        </div>
      }
      <Modal isOpen={isCreateProjectModalOpen} toggle={createModalToggle}>
        <ModalHeader toggle={createModalToggle}>
          {isEdit == 1 ? "Edit Project" : "Create Project"}
        </ModalHeader>
        <ModalBody>

          <div>
            <Row><Col>
              <label className="form-label">Project Name</label>

              <input
                className='mb-2 form-control'
                type="text"
                placeholder="Enter project name.."
                name="projectname"

                value={projectData.projectname}
                onChange={(e) => handleProjectChange(e)}
              />
            </Col>
            </Row>
          </div>
          <div>
            {/* <Row>
              <Col> */}
            <label className="mb-1">Project members</label>

            <Select
              options={Members}
              value={ProjectMembers}
              // onChange={(selectedOptions) => setProjectMembers(selectedOptions)}
              onChange={(e) => handleprojectMemberChange(e)}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {<img src={import.meta.env.VITE_API_URL_USER + e.icon} height="30px" width="30px" style={{ borderRadius: "50%" }} />}
                  {e?.label}
                </div>
              )}
              isMulti={true}
            />
            {/* </Col>
            </Row> */}
          </div>


        </ModalBody>
        <ModalFooter>
          <button type="button" disabled={iscreateProjectDisabled}
            onClick={isEdit == 1 ? handleProjectEdit : handleCreateProject} class={"btn btn-success waves-light"} >Submit</button>
          {/* <Button color="primary" className="px-4" disabled={iscreateProjectDisabled}
            onClick={isEdit == 1 ? handleProjectEdit : handleCreateProject}>
            Submit
          </Button> */}
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteProjectModal} toggle={() => { setdeleteProjectModal(false), setprojectId(null) }} centered>
        <ModalBody style={{ textAlign: "center", padding: "30px" }}>
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
            <Button variant="secondary" onClick={() => { setdeleteProjectModal(false), setprojectId(null) }} >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleProjectDelete}>
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectsPage;
