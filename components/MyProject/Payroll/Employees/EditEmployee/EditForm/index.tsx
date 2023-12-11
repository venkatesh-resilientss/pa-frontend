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
import BasicDetailsForm from './BasicDetails';
import LoanoutForm from './LoanoutForm';
import AddressForm from './AddressForm';
import DDForm from './DDForm';
import AgentForm from './AgentForm';
import DeductionsForm from './DeductionsForm';
import W4Form from './W4Form';
import I9Form from './I9Form';
import FeesForm from './FeesForm';

const tabs = [
  {id:'1', label:'Basic Information', component: BasicDetailsForm},
  {id:'2', label: 'Loanout', component: LoanoutForm},
  {id:'3', label: 'Address', component: AddressForm},
  {id:'4', label: 'Direct Deposit', component: DDForm},
  {id:'5', label: 'Agent Information', component: AgentForm},
  {id:'6', label: 'Deductions Information', component: DeductionsForm},
  {id:'7', label: 'Fees Information', component: FeesForm},
  {id:'8', label: `I9`, component: I9Form},
  {id:'9', label: `W4's`, component: W4Form}
]

function Tabs({ control, errors, activeStep }) {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
 
  return (
    <div>
      <div>
        <Nav className='bg-white mb-4 nav-stepper'>
        {
          tabs.map((tab, index) => (
            <NavItem key={index}>
            <NavLink className={"nav-link " + (activeStep === tab.id ? 'active-link' : 'inactive-link')}
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

export default Tabs
