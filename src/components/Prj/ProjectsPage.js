import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAdd } from '@fortawesome/free-solid-svg-icons';
import { GetApiCall, PostApiCall } from '../../ApiCall';
import Select from "react-select"
import { Button } from 'react-bootstrap';
import { CHeader, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
import { toast } from 'react-toastify';
// import Project from './Projects';

const ProjectsPage = () => {
  const navigate = useNavigate()
  const [isCreateProjectModalOpen, setisCreateProjectModalOpen] = useState(false)
  const [iscreateProjectDisabled, setiscreateProjectDisabled] = useState(false)
  const [dropDownOpen, setdropDownOpen] = useState(false)
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
    const response = await GetApiCall("projects");
    setAllProjects(response.data.projects)
    console.log("getProjectsDetails data::", response);
    // return response;
  }
  async function getMembersDetails() {
    const data = await GetApiCall("users");
    console.log("getProjectsDetails data::users", data);
    // return data;
    // setMembers(data.data.user.map(user=>user.email))
    setMembers(data.data.user)
  }
  useEffect(() => {

    getProjectsDetails()
    getMembersDetails()

  }, [])
  console.log("all members otpon::", Members);


  console.log("setisCreateProjectModalOpen", isCreateProjectModalOpen);
  const openCreateProjectModal = () => {
    setisCreateProjectModalOpen(true)
    console.log("openCreateProjectModal");
  }

  const handleCreateProject = async () => {
    // setiscreateProjectDisabled(true)
    // const mapIds = ProjectMembers.map((id) => (
    //   id.value
    // ))
    let valid = true;
    if(projectData.projectname==""){
      toast.error("Please Enter Project name!")
      valid=false
    }
    if(ProjectMembers.length<1){
      toast.error("Please Select Project Member!")
      valid=false
    }

    if (!valid) return 0;
    const payload = {
      project_name: projectData.projectname,
      members: ProjectMembers
    }
    console.log("payload of crete project;::", payload);

    const resp = await PostApiCall("project_c/", payload)
    console.log("respopnse of create project::", resp);
    setiscreateProjectDisabled(false);
    setprojectData({
      projectname: "",
    })
    setProjectMembers([])
    setisCreateProjectModalOpen(false);
    console.log("respopnse of create project::1", resp);

    getProjectsDetails()
  }
  console.log("prokect members::", ProjectMembers);

  function handleprojectMemberChange(data) {
    console.log("prokect members::dd", data);
    let sop = "";
    setProjectMembers(data);
    // if (data.length > 0) {

    //   for (let i = 0; i < data.length; i++) {
    //     if (i == 0) {
    //       sop = data[i]["value"];
    //     } else {
    //       sop = sop + "," + data[i]["value"];
    //     }
    //     // setprojectMember_id(sop);

    //   }
    // }
  }

  console.log("AllProjects data::", AllProjects);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>


        <button onClick={openCreateProjectModal} style={{ border: "none" }} title='Create project'>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4CAF50"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
        </button>


      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {AllProjects.map((project, index) => (
          <div
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
              <span onClick={() => setdropDownOpen(!dropDownOpen)}>...</span>
              {/* <Dropdown isOpen={dropDownOpen} toggle={()=>setdropDownOpen(!dropDownOpen)} direction="down">
                <DropdownToggle tag="a" href="#" className="btn btn-light btn-icon">
                  <i className="ri-equalizer-fill"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 23px)" }}>
                  <li><DropdownItem><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</DropdownItem></li>
                  <li><DropdownItem><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</DropdownItem></li>
                  <li className="dropdown-divider"></li>
                  <li><DropdownItem><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</DropdownItem></li>
                </DropdownMenu>
              </Dropdown> */}
            </div>
            <div onClick={() => navigate("project", { state: { project_id: project._id } })}>
              <p style={{ margin: 0, fontWeight: 500 }}>Project Name :{project?.project_name.length > 10 ? project?.project_name.slice(0, 17) : project?.project_name}</p>
              <p>Total Tasks: {project?.total_task}</p>
              <p>Members: {project?.members.length}</p>

            </div>

            <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
              <FontAwesomeIcon icon={faFolderOpen} size="2x" color="#f0ad4e" />
            </div>
          </div>
        ))
        }
      </div>

      <Modal isOpen={isCreateProjectModalOpen} toggle={() => setisCreateProjectModalOpen(!isCreateProjectModalOpen)}>
        <ModalHeader>
          Create Project
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
            <label className="mb-1">Project members</label>

            <Select
              options={Members}
              value={ProjectMembers}
              // onChange={(selectedOptions) => setProjectMembers(selectedOptions)}
              onChange={(e) => handleprojectMemberChange(e)}
              isMulti={true}
            /></div>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="px-4" disabled={iscreateProjectDisabled}
            onClick={handleCreateProject}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectsPage;
