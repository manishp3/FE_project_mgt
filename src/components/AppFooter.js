import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="ms-auto d-flex justify-content-between align-items-center w-100 gap-3">
        <div>
          <p className="mb-0 fw-semibold">Project Management System</p>
        </div>
        <div className="text-end">
          <span className="me-1">Design and Developed By</span>
          <a
            href={import.meta.env.VIEW_PORTFOLIO || "https://manishportfolio-delta.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            MD
          </a>
        </div>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
