import React, {useState} from 'react'
import { Badge, Button, Card, Collapse } from 'react-bootstrap'

function Job({job}) {
    const [open, setOpen] = useState(false)
    return (
        <Card className = "mb-5">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="success" className="m-2">{job.type}</Badge>
                        <Badge variant="secondary" className="m-2">{job.location}</Badge>
                        <div>
                            {job.how_to_apply}
                        </div>
                    </div>

                    <img src={job.company_logo} alt={job.company} height="50" className="d-none d-md-block" ></img>
                </div>
            <Card.Text>
                <Button onClick={()=>setOpen(prevOpen => !prevOpen)} variant="primary">
                    {open ? 'Hide Details' : 'Show details'}
                </Button>
            </Card.Text>
           <Collapse in={open}>
           <div className="mt-2">
                {job.description}
            </div>
           </Collapse>
            </Card.Body>
            
        </Card>
    )
}

export default Job
