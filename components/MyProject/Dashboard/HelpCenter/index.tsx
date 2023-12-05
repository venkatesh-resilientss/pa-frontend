import { Col, Row } from 'reactstrap'
import HelpCenterCard from './HelpCenterCard'
import helpcenter1 from 'assets/DashboardIcons/helpcenter1.svg'
import helpcenter2 from 'assets/DashboardIcons/helpcenter2.svg'
import helpcenter3 from 'assets/DashboardIcons/helpcenter3.svg'

function HelpCenter() {
  return (
    <>
    <div className='my-1 mt-2 mb-2' style={{ fontSize: '18px', fontWeight: '600', color: '#030229' }}>
        Help Center
      </div>
    <div style={{ marginBottom: '4rem' }}>
      
      <Row className='mt-2'>
        <Col xl='4'>
          <HelpCenterCard
            title={'Support Center'}
            description={'Your direct line to our support team.'}
            link={'Get Help'}
            image={helpcenter1}
          />
        </Col>

        <Col xl='4'>
          <HelpCenterCard
            title={'Knowledgebase & Resources'}
            description={'Answers at your fingertips.'}
            link={'Explore Resources'}
            image={helpcenter2}
          />
        </Col>

        <Col xl='4'>
          <HelpCenterCard
            title={'Feedback and Feature Requests'}
            description={'Help shape the future of our software'}
            link={'Share Feedback'}
            image={helpcenter3}
          />
        </Col>
      </Row>
    </div>
    </>
    
  )
}

export default HelpCenter
