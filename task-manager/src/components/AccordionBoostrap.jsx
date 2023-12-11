import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

function AccordionBoostrap() {

    const [tasksList, setTasksList] = useState([]);
    const [collaboratorsList, setcollaboratorsList] = useState([]);
    const [accordion, setAccordion] = useState(-1);

    useEffect(() => {
        getCollaborators();
        getTasks();
     }, []);

    const getTasks = () => {
        const endPoint = 'http://127.0.0.1:3000/task/getTasksFiltered';

        const bodyData = {
            filterType: 'All',
            filter: ''
          }

        const endpointConfig = {
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
          }

          fetch(endPoint, endpointConfig)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTasksList(data)
           })
           .catch(error => console.error(error));
    }

    const getCollaborators = () => {
        const endPoint = 'http://127.0.0.1:3000/collaborator/getAllCollaborators';

        const bodyData = {
            
          }

        const endpointConfig = {
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(bodyData)
          }

          fetch(endPoint, endpointConfig)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setcollaboratorsList(data)
           })
           .catch(error => console.error(error));
    }

    function toggleAccordion(index) {
        setAccordion(index);
    }


    return(
        <>
            <div className="container">
                <div>
                    <h1>Un subtitulo talvez?</h1>
                </div>
                <div>
                    <Accordion>
                        {tasksList.map((task, index) => (
                            <div key={index} onClick={() => toggleAccordion(index)}>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        {task.descripcion}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            {collaboratorsList[task.colaborador_id-1]['nombre']}
                                        </div>
                                        <div>
                                            {task.estado}
                                        </div>
                                        <div>
                                            {task.prioridad}
                                        </div>
                                        <div>
                                            {task.fecha_inicio}
                                        </div>
                                        <div>
                                            {task.fecha_fin}
                                        </div>
                                        <div>
                                            {task.notas}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default AccordionBoostrap