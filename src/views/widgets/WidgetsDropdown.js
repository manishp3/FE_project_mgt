import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { Col } from 'react-bootstrap'
import { GetApiCall } from '../../ApiCall'
import CountUp from 'react-countup'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  const [dashboardData, setdashboardData] = useState([])
  console.log("dashboardData::", dashboardData);

  useEffect(() => {
    async function getDashbaordDetails() {
      const response = await GetApiCall("user_project_detail")
      console.log("getDashbaordDetails::", response);
      if (response.data.success == true) {
        setdashboardData(response.data)
      }
    }
    getDashbaordDetails()
  }, [])

  // const mappedBoxes =
  // {
  //   project_svg: <svg fill="#000000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M2,9H9V2H2ZM4,4H7V7H4Zm7-2V9h7V2Zm5,5H13V4h3ZM2,18H9V11H2Zm2-5H7v3H4Zm7,5h7V11H11Zm2-5h3v3H13Z"></path> </g> </g></svg>,
  //   task_svg:

  //     <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M12.37 8.87988H17.62" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //       <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //       <path d="M12.37 15.8799H17.62" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //       <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //       <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  //     </svg>,
  //   inprogress_svg:<svg fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs></defs><title>in-progress</title><path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,0,1,16,4V16l8.4812,8.4814A11.9625,11.9625,0,0,1,16,28Z" /><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32" /></svg>,
  //   complete_svg:

  //     <svg width="50px" height="50px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><defs></defs><title /><path class="cls-1" d="M28.46,42.29A2,2,0,0,1,27,41.71l-9.5-9.5a2,2,0,0,1,2.83-2.83l8.09,8.09L43.63,22.29a2,2,0,1,1,2.83,2.83L29.87,41.71A2,2,0,0,1,28.46,42.29Z" /><path class="cls-2" d="M32,60A28,28,0,1,1,60,30.47a2,2,0,0,1-1.88,2.11A2,2,0,0,1,56,30.69,24,24,0,1,0,39.64,54.75,23.86,23.86,0,0,0,53.58,42.51a2,2,0,1,1,3.59,1.75A27.78,27.78,0,0,1,40.91,58.55,28.14,28.14,0,0,1,32,60Z" /></svg>

  //   // ,
  //   // text: "TOTAL PROJECTS",
  //   // value: "234"
  // }
  const mappedBoxes = {
    project_svg: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="#4e73df" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4C2.4477 4 2 4.4477 2 5V8C2 8.5523 2.4477 9 3 9H8C8.5523 9 9 8.5523 9 8V5C9 4.4477 8.5523 4 8 4H3ZM3 15C2.4477 15 2 15.4477 2 16V19C2 19.5523 2.4477 20 3 20H8C8.5523 20 9 19.5523 9 19V16C9 15.4477 8.5523 15 8 15H3ZM16 4C15.4477 4 15 4.4477 15 5V8C15 8.5523 15.4477 9 16 9H21C21.5523 9 22 8.5523 22 8V5C22 4.4477 21.5523 4 21 4H16ZM15 16C15 15.4477 15.4477 15 16 15H21C21.5523 15 22 15.4477 22 16V19C22 19.5523 21.5523 20 21 20H16C15.4477 20 15 19.5523 15 19V16Z" />
      </svg>
    ),

    task_svg: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="#1cc88a" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H15V19H3V17Z" />
      </svg>
    ),
    todo_svg: (

      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 466.0996 757.33868" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><polygon points="445.55216 511.15872 439.99879 732.18262 438.23583 757.33868 363.82075 757.33868 361.14102 708.85849 339.38595 524.09737 445.55216 511.15872" fill="#9d616a" /><path d="M286.86534,164.69778c1.80928-5.58216,9.84149-7.21924,14.65085-3.8571s6.45046,9.96,5.51675,15.75328-3.97363,10.99943-6.95678,16.05262c-22.29034,37.75801-51.58068,144.51602-73.87102,182.27402,13.18289,8.77823,31.00051,10.09075,45.3274,3.339,7.59851,13.12024,23.05971,21.24856,38.17555,20.06979,15.11584-1.17878,29.13005-11.60567,34.60276-25.74524-3.65481,8.42571-7.30963,16.85141-10.96444,25.27712,18.39422-6.00596,33.54677-21.16276,39.54756-39.55868-4.0025,12.31063-8.00499,24.62126-12.00749,36.93188,25.14616-15.61362,44.11558-115.3702,35.51269-146.27715-.313-1.12451.13435-2.31415,1.11942-2.94034l.0341-.02167c.29332-.18646.55194-.4276.75369-.71061,13.63679-19.12921,8.36578-46.28833-3.1434-66.84633-11.59532-20.71186-28.66072-38.13593-38.86647-59.56664-13.54943-28.45197-14.83326-63.41079-36.26678-86.51286-13.59988-14.65861-33.57705-22.10078-53.45067-24.30777-19.87362-2.20699-39.9339.32515-59.76911,2.85418l1.37343-3.18989c-17.06966-12.45151-41.89937-8.6985-59.36632,3.18927-17.46695,11.88777-29.24574,30.25591-40.53958,48.11264-10.34581,16.3578-20.69162,32.71559-31.03743,49.07339-10.13313,16.02153-49.46201,86.52241-53.11221,105.12472-3.65021,18.60231.8282,40.05373,15.87379,51.5863,1.90547-9.90245,3.81094-19.80491,5.71641-29.70736l-1.80019,1.55565c12.77649,46.4702,12.70591,115.22251-29.03978,139.30601,18.29292,5.34578,39.22164.4817,53.28215-12.38339l-26.72311,29.88867c14.43169-.25136,28.75119-5.04707,40.42336-13.53808l-20.45149,24.2512,54.6218-28.03675-11.36183,28.79717c22.76575-4.27387,45.5315-8.54774,68.29725-12.8216" fill="#090814" /><polygon points="120.125 698.86244 107.53358 757.17276 363.35052 757.17276 354.14111 726.24144 120.125 698.86244" fill="#090814" /><path d="M35.15853,654.99086L.0399,698.25421s-2.64425,58.91856,35.11863,58.91856,93.60137-110.40924,93.60137-110.40924l-39.27535-99.34202-63.30835-15.54942,8.98233,123.11878Z" fill="#9d616a" /><path d="M338.96954,192.12813c3.15017-67.62488-49.11703-124.99953-116.74191-128.1497-67.62488-3.15017-124.99999,49.11701-128.15016,116.74189-2.55481,54.84425,31.34287,102.94028,80.31826,120.84382l16.3836,157.5391,125.35552-94.93793s-24.52183-34.41947-36.75792-72.51133c34.06371-20.38861,57.60683-56.89721,59.5926-99.52585Z" fill="#9d616a" /><path d="M294.95903,325.28693s-44.42692,166.60093-116.62065,19.99211l-95.42092,44.261s6.66404,251.01207,26.65615,286.5536c0,0-21.10278,33.32019,4.44269,39.98422,25.54548,6.66404,12.2174-4.44269,25.54548,6.66404,13.32807,11.10673,39.98422-7.77471,39.98422-7.77471,0,0,134.83035,51.42599,174.59511,11.27425v-166.3352s67.53158-61.52026,111.95849-17.09334c0,0-8.88538-141.05546-58.86566-172.1543s-112.27491-45.37168-112.27491-45.37168Z" fill="#6c63ff" /><path d="M103.46491,401.20211l-20.54745-11.66207S3.50435,530.04016,12.38973,550.03227c8.88538,19.99211,113.28863,18.88144,113.28863,18.88144l-22.21346-167.7116Z" fill="#6c63ff" /><path d="M205.69927,10.9053c19.83521-2.52904,39.89549-5.06117,59.76911-2.85418,19.87362,2.20699,39.85079,9.64916,53.45067,24.30777,21.43352,23.10208,22.71735,58.0609,36.26678,86.51286,10.20575,21.43071,27.27114,38.85478,38.86647,59.56664,11.50918,20.55799,16.78019,47.71712,3.1434,66.84633-.20175.28301-.46037.52415-.75369.71061h0c-.99533.63272-1.46447,1.8537-1.11201,2.97921,8.817,28.15524-3.43898,61.66556-28.55419,77.25996,4.0025-12.31063,8.00499-24.62126,12.00749-36.93188-6.00079,18.39591-25.15333,98.55272-43.54756,104.55868,3.65481-8.42571,7.30963-16.85141,10.96444-25.27712-5.47271,14.13957-19.48693,24.56647-34.60276,25.74524s-30.57704-6.94954-38.17555-20.06979c-14.3269,6.75174-32.14451,5.43923-45.3274-3.339,22.29034-37.75801,48.58068-140.51601,70.87102-178.27402,2.98315-5.0532,6.02307-10.25934,6.95678-16.05262s-.70738-12.39114-5.51675-15.75328-12.84157-1.72506-14.65085,3.8571" fill="#090814" /><path d="M86.18615,349.39959l-22.59146,175.57526c-4.34236-2.832-6.77521-4.93132-6.77521-4.93132l14.43875-172.1543,14.92792,1.51036Z" fill="#090814" /><polygon points="287.18432 164.23936 170.56367 70.94284 86.80482 212.921 86.80482 123.33754 183.89174 29.84794 261.63885 37.62265 287.18432 164.23936" fill="#090814" /><path d="M441.66043,606.75185l-262.6423,117.26747c-8.90378,3.97546-19.3813-.03383-23.35676-8.93761L21.06712,413.63285c-3.97546-8.90378.03343-19.38219,8.93721-23.35765l262.6423-117.26747c8.90378-3.97546,19.3817.03472,23.35716,8.9385l134.59426,301.44886c3.97546,8.90378-.03383,19.3813-8.93761,23.35676Z" fill="#d6d6e3" /><path d="M321.74727,389.24261l-158.88229,70.93954c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l158.88229-70.93954c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M277.73181,435.37658l-105.00841,46.88533c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l105.00841-46.88533c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M155.4397,500.73258l-46.06334,20.56688c-.75617.33763-1.6436-.00195-1.98122-.75813l-19.97723-44.74271c-.33763-.75617.00195-1.6436.75813-1.98122l41.78311-18.65579c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122l-40.41344,18.04424,18.75413,42.00336,43.32399-19.34378-11.10461-24.87084c-.33763-.75617.00195-1.6436.75813-1.98122s1.6436.00195,1.98122.75813l11.71616,26.24051c.33763.75617-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M131.06246,500.86316c-.41821.18673-.89934.17268-1.30663-.04011l-20.53828-10.7404c-.73421-.38446-1.01805-1.29085-.63448-2.02465s1.29085-1.01805,2.02465-.63448l18.78732,9.82492,11.4642-53.94376c.17233-.81168.96906-1.32676,1.77905-1.15581.81079.17273,1.32765.96866,1.15581,1.77905l-11.87576,55.87719c-.09788.45866-.4042.84569-.82913,1.04611l-.02675.01194Z" fill="#6c63ff" /><path d="M355.58624,465.03128l-158.88229,70.93954c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l158.88229-70.93954c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M311.57079,511.16526l-105.00841,46.88533c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l105.00841-46.88533c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M189.27867,576.52126l-46.06334,20.56688c-.75617.33763-1.6436-.00195-1.98122-.75813l-19.97723-44.74271c-.33763-.75617.00195-1.6436.75813-1.98122l41.78311-18.65579c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122l-40.41344,18.04424,18.75413,42.00336,43.32399-19.34378-11.10461-24.87084c-.33763-.75617.00195-1.6436.75813-1.98122s1.6436.00195,1.98122.75813l11.71616,26.24051c.33763.75617-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M164.90143,576.65183c-.41821.18673-.89934.17268-1.30663-.04011l-20.53828-10.7404c-.73421-.38446-1.01805-1.29085-.63448-2.02465s1.29085-1.01805,2.02465-.63448l18.78732,9.82492,11.4642-53.94376c.17233-.81168.96906-1.32676,1.77905-1.15581.81079.17273,1.32765.96866,1.15581,1.77905l-11.87576,55.87719c-.09788.45866-.4042.84569-.82913,1.04611l-.02675.01194Z" fill="#6c63ff" /><path d="M389.42522,540.81996l-158.88229,70.93954c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l158.88229-70.93954c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M345.40976,586.95394l-105.00841,46.88533c-.75617.33763-1.6436-.00195-1.98122-.75813s.00195-1.6436.75813-1.98122l105.00841-46.88533c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M223.11765,652.30994l-46.06334,20.56688c-.75617.33763-1.6436-.00195-1.98122-.75813l-19.97723-44.74271c-.33763-.75617.00195-1.6436.75813-1.98122l41.78311-18.65579c.75617-.33763,1.6436.00195,1.98122.75813s-.00195,1.6436-.75813,1.98122l-40.41344,18.04424,18.75413,42.00336,43.32399-19.34378-11.10461-24.87084c-.33763-.75617.00195-1.6436.75813-1.98122s1.6436.00195,1.98122.75813l11.71616,26.24051c.33763.75617-.00195,1.6436-.75813,1.98122Z" fill="#090814" /><path d="M198.74041,652.44051c-.41821.18673-.89934.17268-1.30663-.04011l-20.53828-10.7404c-.73421-.38446-1.01805-1.29085-.63448-2.02465s1.29085-1.01805,2.02465-.63448l18.78732,9.82492,11.4642-53.94376c.17233-.81168.96906-1.32676,1.77905-1.15581.81079.17273,1.32765.96866,1.15581,1.77905l-11.87576,55.87719c-.09788.45866-.4042.84569-.82913,1.04611l-.02675.01194Z" fill="#6c63ff" /><path d="M83.46321,482.90264l-10.52258,210.31373L.0399,698.25421l25.55089-218.1242c-10.08388-10.75957-16.11726-26.80659-15.2713-44.4645,1.48027-30.89678,23.40841-54.95021,48.97818-53.72522,25.56976,1.22508,45.09795,27.26457,43.61767,58.16145-.84597,17.65801-8.38631,33.05458-19.45215,42.8009Z" fill="#9d616a" /></svg>
    ),
    inprogress_svg: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="#f6c23e" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.18 0 9.45-3.95 9.95-9h-2.02c-.48 3.92-3.86 7-7.93 7-4.42 0-8-3.58-8-8s3.58-8 8-8v4l5-5-5-5v4z" />
      </svg>
    ),

    complete_svg: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="#36b9cc" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    )
  };



  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {/* {mappedBoxes.map(box)=>( */}
        {/* {dashboardData?.map((box, index) => ( */}
        <div
          style={{
            cursor: "pointer",
            flex: "1 1 240px",
            maxWidth: "260px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            gap: "16px",
            margin: "10px"
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {mappedBoxes.project_svg}
          </div>

          <div style={{ lineHeight: "1.2" }}>
            <p className="text-muted fw-semibold" style={{ fontSize: "14px", margin: 0 }}>
              Total Projects
            </p>
            <p className="fw-bold" style={{ fontSize: "24px", margin: 0 }}>


              <CountUp start={0} delay={1} end={dashboardData?.total_projects || 0} />/<span style={{ fontSize: "16px" }} className='text-muted'><CountUp start={0} delay={1} end={dashboardData?.total_hours || 0} /> h</span>
            </p>
          </div>
        </div>
        <div
          style={{
            cursor: "pointer",
            flex: "1 1 240px",
            maxWidth: "260px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            gap: "16px",
            margin: "10px"
          }}
          className='transition-transform duration-200 hover:scale-105'
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {mappedBoxes.task_svg}
          </div>

          <div style={{ lineHeight: "1.2" }}>
            <p className="text-muted fw-semibold" style={{ fontSize: "14px", margin: 0 }}>
              Total Task
            </p>
            <p className="fw-bold" style={{ fontSize: "24px", margin: 0 }}>
              {/* {dashboardData?.tasks} */}
              <CountUp start={0} delay={1} end={dashboardData?.tasks || 0} />
              {/* <span style={{ fontSize: "16px" }} className='text-muted'>{dashboardData.total_hours + "h"}</span> */}
            </p>
          </div>
        </div>
        <div
          style={{
            cursor: "pointer",
            flex: "1 1 240px",
            maxWidth: "260px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            gap: "16px",
            margin: "10px"
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {mappedBoxes.todo_svg}
          </div>

          <div style={{ lineHeight: "1.2" }}>
            <p className="text-muted fw-semibold" style={{ fontSize: "14px", margin: 0 }}>
              Todos
            </p>
            <p className="fw-bold" style={{ fontSize: "24px", margin: 0 }}>

              <CountUp start={0} delay={1} end={dashboardData?.todo_task?.task || 0} />
              /<span style={{ fontSize: "16px" }} className='text-muted'><CountUp start={0} delay={1} end={dashboardData?.todo_task?.hours || 0} />h</span>
            </p>
          </div>
        </div>
        <div
          style={{
            cursor: "pointer",
            flex: "1 1 240px",
            maxWidth: "260px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            gap: "16px",
            margin: "10px"
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {mappedBoxes.inprogress_svg}
          </div>

          <div style={{ lineHeight: "1.2" }}>
            <p className="text-muted fw-semibold" style={{ fontSize: "14px", margin: 0 }}>
              InProgress
            </p>
            <p className="fw-bold" style={{ fontSize: "24px", margin: 0 }}>
              <CountUp start={0} delay={2} end={dashboardData?.inprogress_task?.task || 0} />
              /<span style={{ fontSize: "16px" }} className='text-muted'>
                <CountUp start={0} delay={2} end={dashboardData?.inprogress_task?.hours || 0} />h</span>
            </p>
          </div>
        </div>
        <div
          style={{
            cursor: "pointer",
            flex: "1 1 240px",
            maxWidth: "260px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "16px 20px",
            gap: "16px",
            margin: "10px"
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {mappedBoxes.complete_svg}
          </div>

          <div style={{ lineHeight: "1.2" }}>
            <p className="text-muted fw-semibold" style={{ fontSize: "14px", margin: 0 }}>
              Completed
            </p>
            <p className="fw-bold" style={{ fontSize: "24px", margin: 0 }}>
              <CountUp start={0} delay={1} end={dashboardData?.done_task?.task||0} />
              /<span style={{ fontSize: "16px" }} className='text-muted'><CountUp start={0} delay={1} end={dashboardData?.done_task?.hours||0}/>h</span>
            </p>
          </div>
        </div>

        {/* ))} */}
        {/* )} */}
      </div>
      {/* <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Users"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              $6.200{' '}
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Income"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              2.49%{' '}
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Conversion Rate"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              44K{' '}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Sessions"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol> */}
    </CRow >
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
