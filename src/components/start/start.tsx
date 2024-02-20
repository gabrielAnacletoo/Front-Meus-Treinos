import { Button, Col , Row , Container } from 'react-bootstrap'
import * as D from './style'
import { useNavigate } from 'react-router-dom'

export const Start = () => {
    const navigate = useNavigate()

   
    const handleRegister = () => {
        navigate('/register')
    }

    const handleWorkouts = () => {
        navigate('/treinos')
    }

    const handleEdit = () => {
        navigate('/edit')
    }
    return (
    <>
    <Container fluid>
    <Col>
    <Row>
    <D.DivStart>
    <Button variant="primary" className="BtnStart rounded-0 shadow" size="sm" onClick={handleWorkouts}>Iniciar Meu treino</Button> <br />
    <Button variant="primary"  className="BtnStart  rounded-0 shadow" size="sm" onClick={handleRegister} >Registrar Treinos</Button><br />
    <Button variant="primary"  className="BtnStart  rounded-0 shadow" size="sm" onClick={handleEdit}>Editar Meus Treinos</Button>
    </D.DivStart>
   
    </Row>
    </Col>
    </Container>
    </>

        )
}