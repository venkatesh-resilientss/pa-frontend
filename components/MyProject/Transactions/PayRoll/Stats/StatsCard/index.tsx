import { Card, CardBody } from 'reactstrap'

function StatsCard({ title, value }) {
  return (
    <Card
      className='text-black'
      style={{
        width: '140px',
        height: '54px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '4px',
        paddingRight: '4px'
      }}
    >
      <div style={{ fontSize: '10px', fontWeight: '600' }}>{title}</div>
      <div style={{ fontSize: '12px', fontWeight: '600' }}>{value}</div>
    </Card>
  )
}

export default StatsCard
