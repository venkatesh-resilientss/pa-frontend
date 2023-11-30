import React, { useState, createElement } from 'react'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from 'reactstrap'

import UnionForm from './UnionForm';
import PayratesForm from './PayratesForm';
import AllowancesForm from './Allowances';
import ProjectForm from './Project';

const tabs = [
  {id:'1', label: 'Union Form', component: UnionForm},
  {id:'2', label: 'Payrates', component: PayratesForm},
  { id:'3', label: 'Allowances', component: AllowancesForm},
  {id:'4', label: 'Project', component: ProjectForm}
]

function StartForm({ control, errors, activeStep }) {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
 
  return (
    <div style={{ fontFamily: 'Segoe UI',fontSize:"14px",fontWeight:"500" }}>
      <div>
        <Nav className='bg-white mb-4' style={{borderBottom:"1px solid",borderColor:"#DBDCDC"}}>
        {
          tabs.map((tab, index) => (
            <NavItem key={index}>
            <NavLink
            style={{
              borderBottom: activeStep === tab.id ? '2px solid #293991' : 'none',
              transition: 'border-bottom 0.3s ease',
              color:activeStep === tab.id ? '#293991' : '#C9C9C9',

            }}
              active={activeStep === tab.id}
              onClick={() => {
                toggle(tab.id)
              }}
            >
              {tab.label}
            </NavLink>
          </NavItem>
          ))
        }
      </Nav>
      <TabContent className='py-50' activeTab={activeStep}>
        {
          tabs.map((tab, index) => (
            (activeStep === tab.id && <TabPane key={index} tabId={tab.id}>
            <Row>
              <Col >
              {createElement(tab.component, {
                control: control, errors: errors
              }
              )}
              </Col>
            </Row>
          </TabPane>)
          ))
        }
      </TabContent>
        </div>
    </div>
  )
}

export default StartForm
