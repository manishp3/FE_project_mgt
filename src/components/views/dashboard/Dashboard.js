import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
// import CommonGrid from '../../components/utils/CommonGrid'
import { GetApiCall } from '../../../ApiCall'
import DashboardGrid from './DashboardGrid'
// import PieChart from './PieChart'
import PieChart123 from './PieChart123'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const headers = ['Member', "Hours", "Tasks"]
  const accessorKey = ['name', "total_spending_hour", "total_tasks"]
  const [gridData, setgridData] = useState([])
  console.log("grid data gridData ::", gridData);
  const GridDataApiCall = async () => {
    const data = await GetApiCall("get_member_full_detail")
    console.log("grid data member ::", data);
    if (data?.data.success == true) {
      setgridData(data?.data?.members)
    }
  }
  const [ExpiringTasks, setExpiringTasks] = useState([])
  const getExpiringSoonTasks = async () => {
    const data = await GetApiCall("soon_expiry_task")
    console.log("ExpiringTasks member ::", data);
    if (data?.data.success == true) {
      setExpiringTasks(data?.data?.data)
    }
  }
  useEffect(() => {
    GridDataApiCall()
    getExpiringSoonTasks()
  }, [])

  const Exp_headers = ["Name", "Expiry Date", "Status"]
  const Exp_accessorKey = ["label", "due_date", "status"]


  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <div>
        <Card>
          <CardHeader>
            Members Details
          </CardHeader>
          <CardBody>
            <DashboardGrid
              headers={headers}
              accessorKey={accessorKey}
              data={gridData}
            />
          </CardBody>
        </Card>
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {/* <Card> */}
        <div style={{ flex: 1.33 }}>
          {/* <DashboardGrid
            headers={Exp_headers}
            accessorKey={Exp_accessorKey}
            data={ExpiringTasks}
          /> */}
          <Card>
            <CardHeader>
              Soon Expriring Tasks
            </CardHeader>
            <CardBody>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f3f4f6", color: "#111827", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>#</th>
                    <th style={{ padding: "12px" }}>Task Name</th>
                    <th style={{ padding: "12px" }}>Expiry Date</th>
                    <th style={{ padding: "12px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ExpiringTasks.map((task, index) => {
                    const today = new Date();
                    const todayUTC = new Date(Date.UTC(
                      today.getUTCFullYear(),
                      today.getUTCMonth(),
                      today.getUTCDate()
                    ));
                    const dueDateStr = task?.due_date;
                    if (!dueDateStr) return null;
                    const dueDate = new Date(dueDateStr);
                    const dueDateUTC = new Date(Date.UTC(
                      dueDate.getUTCFullYear(),
                      dueDate.getUTCMonth(),
                      dueDate.getUTCDate()
                    ));
                    const diffTime = dueDateUTC - todayUTC;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    let displayText = "";
                    if (diffDays > 0) {
                      displayText = `Expires in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
                    } else if (diffDays === 0) {
                      displayText = "Expires today";
                    } else {
                      displayText = `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
                    }

                    return (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                        <td style={{ padding: "12px" }}>{index + 1}</td>
                        <td style={{ padding: "12px", cursor: "pointer" }} title="Click to Navigate" onClick={() => navigate("../projects/project", { state: { project_id: task.project_id } })}>{task?.label}</td>
                        <td style={{ padding: "12px" }}>{new Date(task?.due_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric"
                        })}</td>
                        <td style={{ padding: "12px", color: diffDays < 0 ? "#b91c1c" : "#2563eb", fontWeight: "500" }}>
                          {displayText}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>

        </div>
        <div style={{ flex: 1 }}>
          <Card>
            <CardHeader>
              Projects
            </CardHeader>
            <CardBody>
              <PieChart123 />
            </CardBody>
          </Card>
        </div>
        
      </div >
    </>
  )
}

export default Dashboard
