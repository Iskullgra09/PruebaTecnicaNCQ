import * as React from 'react';
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './AccordionBoostrap.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AccordionBoostrap() {

    const [tasksList, setTasksList] = useState([]);
    const [collaboratorsList, setcollaboratorsList] = useState([]);
    const [accordion, setAccordion] = useState(-1);
    const [editStatus, setEditStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [startDate, setStartDate] = useState(dayjs('2022-12-11'));
    const [endDate, setEndDate] = useState(dayjs('2022-12-11'));
    const [startDateModal, SetStartDateModal] = useState(dayjs('2023-12-12'));
    const [endDateModal, setEndDateModal] = useState(dayjs('2023-12-12'));
    const [filter2, setFilter2] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        getCollaborators();
        getTasks('', 'All');
    }, []);

    const getTasks = (filter, filterType) => {
        const endPoint = 'http://127.0.0.1:3000/task/getTasksFiltered';

        const bodyData = {
            filterType: filterType,
            filter: filter
        }

        const endpointConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }

        fetch(endPoint, endpointConfig)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                formatDates(data)

            })
            .catch(error => console.error(error));
    }

    const formatDates = (tasks) => {

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].fecha_inicio = tasks[i].fecha_inicio.split('T')[0];
            tasks[i].fecha_fin = tasks[i].fecha_fin.split('T')[0];
        }
        setTasksList(tasks)
    }

    const getCollaborators = () => {
        const endPoint = 'http://127.0.0.1:3000/collaborator/getAllCollaborators';

        const bodyData = {

        }

        const endpointConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
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
        if (editStatus && accordion != index) {
            toggleCancel();
        }
    }

    function toggleEdit(task, index) {
        console.log(task.fecha_inicio)
        console.log(task.fecha_fin)
        setEditStatus(!editStatus);
        setEditIndex(index);
        setStartDate(dayjs(task.fecha_inicio));
        setEndDate(dayjs(task.fecha_fin));
    }

    function toggleCancel() {
        setEditStatus(!editStatus);
    }

    function toggleConfirmEdit(task) {

        var id = task.id
        var description = task.descripcion
        var collaborator_id = task.colaborador_id
        var state = task.estado
        var priority = task.prioridad
        var startDate = dayjs(task.fecha_inicio).format('YYYY-MM-DD')
        var endDate = dayjs(task.fecha_fin).format('YYYY-MM-DD')
        var notes = task.notas

        const bodyData = {
            id : id,
            description: description,
            collaborator_id: collaborator_id,
            state: state,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            notes: notes
        }

        console.log(bodyData);

        const endPoint = 'http://127.0.0.1:3000/task/updateTask';

        const endpointConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }

        fetch(endPoint, endpointConfig)
            .then(response => response.json())
            .then(data => {
                getTasks('', 'All');
                toggleCancel()

            })
            .catch(error => console.error(error));
    }

    function chooseFilter1(choise) {
        console.log(choise);
        if (choise == 'Todas') {
            var select = document.getElementById('inputGroupSelect05')

            while (select.hasChildNodes()) {
                select.removeChild(select.firstChild)
            }

            setFilter2(false);
        }
        if (choise == 'Estado') {
            var select = document.getElementById('inputGroupSelect05')

            while (select.hasChildNodes()) {
                select.removeChild(select.firstChild)
            }

            let option1 = document.createElement("option");
            option1.setAttribute("value", "PENDIENTE");
            let option1Texto = document.createTextNode("PENDIENTE");
            option1.appendChild(option1Texto);

            let option2 = document.createElement("option");
            option2.setAttribute("value", "EN PROCESO");
            let option2Texto = document.createTextNode("EN PROCESO");
            option2.appendChild(option2Texto);

            let option3 = document.createElement("option");
            option3.setAttribute("value", "FINALIZADA");
            let option3Texto = document.createTextNode("FINALIZADA");
            option3.appendChild(option3Texto);

            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);

            setFilter2(true);
        }
        else if (choise == 'Colaborador') {
            var select = document.getElementById('inputGroupSelect05')

            while (select.hasChildNodes()) {
                select.removeChild(select.firstChild)
            }

            collaboratorsList.forEach(collaborator => {
                let newOption = document.createElement("option");
                newOption.setAttribute("value", collaborator.id);
                let newOptionText = document.createTextNode(collaborator.nombre);
                newOption.appendChild(newOptionText);
                select.appendChild(newOption);
            });

            setFilter2(true);
        }
        else if (choise == 'Prioridad') {
            var select = document.getElementById('inputGroupSelect05')

            while (select.hasChildNodes()) {
                select.removeChild(select.firstChild)
            }

            let option1 = document.createElement("option");
            option1.setAttribute("value", "ALTA");
            let option1Texto = document.createTextNode("ALTA");
            option1.appendChild(option1Texto);

            let option2 = document.createElement("option");
            option2.setAttribute("value", "MEDIA");
            let option2Texto = document.createTextNode("MEDIA");
            option2.appendChild(option2Texto);

            let option3 = document.createElement("option");
            option3.setAttribute("value", "BAJA");
            let option3Texto = document.createTextNode("BAJA");
            option3.appendChild(option3Texto);

            select.appendChild(option1);
            select.appendChild(option2);
            select.appendChild(option3);

            setFilter2(true);
        }
    }

    function chooseFilter2(choise) {
        console.log(choise);
    }

    function toggleFilter() {
        var filterType = document.getElementById('inputGroupSelect04')
        var filter = document.getElementById('inputGroupSelect05')
        console.log(filterType.value)
        console.log(filter.value)

        if (filterType.value == 'Todas') {
            getTasks('', 'All');
        }
        else if (filterType.value == 'Colaborador') {
            getTasks(filter.value, 'Collaborator');
        }
        else if (filterType.value == 'Prioridad') {
            getTasks(filter.value, 'Priority');
        }
        else if (filterType.value == 'Estado') {
            getTasks(filter.value, 'State');
        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addNewTask = () => {
        var description = document.getElementById('inputDescriptionModal').value
        var collaborator_id = parseInt(document.getElementById('inputGroupSelect01Modal').value)
        var state = document.getElementById('inputGroupSelect02Modal').value
        var priority = document.getElementById('inputGroupSelect03Modal').value
        var startDate = dayjs(startDateModal).format('YYYY-MM-DD')
        var endDate = dayjs(endDateModal).format('YYYY-MM-DD')
        var notes = document.getElementById('inputNotesModal').value

        const bodyData = {
            description: description,
            collaborator_id: collaborator_id,
            state: state,
            priority: priority,
            startDate: startDate,
            endDate: endDate,
            notes: notes
        }

        console.log(bodyData);

        const endPoint = 'http://127.0.0.1:3000/task/insertNewTask';

        const endpointConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }

        fetch(endPoint, endpointConfig)
            .then(response => response.json())
            .then(data => {
                getTasks('', 'All');
                handleClose();

            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <h1 className='titulo'>
                Organizador de tareas
            </h1>

            <button type="button" className="btn btn-info btn-flotante" onClick={handleShow}>
                <i className="bi bi-clipboard-plus-fill icon-btn-flotante"></i>
            </button>
            <div className='centerCard'>
                <div>
                    <div className="card text-center">
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-md-5 marginInputs">
                                    <>
                                    </>
                                </div>
                                <div className='col-md-3 marginInputs'>
                                    <select className="form-select" id="inputGroupSelect04" defaultValue="Todas" onChange={(e) => chooseFilter1(e.target.value)}>
                                        <option value="Todas">Todas</option>
                                        <option value="Colaborador">Colaborador</option>
                                        <option value="Estado">Estado</option>
                                        <option value="Prioridad">Prioridad</option>
                                        <option value="Fechas">Fechas</option>
                                    </select>
                                </div>

                                <div className='col-md-3 marginInputs'>
                                    <select disabled={!filter2 ? 'disabled' : ''} className="form-select" id="inputGroupSelect05" onChange={(e) => chooseFilter2(e.target.value)}>

                                    </select>
                                </div>

                                <div className="col-md-1 marginInputs">
                                    <button className="btn btn-success" type="button" onClick={() => toggleFilter()}>Filtrar</button>
                                </div>


                                <div>
                                    <Accordion>
                                        {tasksList.map((task, index) => (
                                            <div key={index} onClick={() => toggleAccordion(task, index)}>
                                                <Accordion.Item eventKey={index}>
                                                    <Accordion.Header>
                                                        {task.descripcion}
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Encargado</h6>
                                                                    {editStatus &&
                                                                        <div className="mb-2">
                                                                            <select className="form-select" defaultValue={task.colaborador_id} id="inputGroupSelect01">
                                                                                {collaboratorsList.map((collaborator, index2) => (
                                                                                    <option key={index2} value={collaborator.id}>{collaborator.nombre}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>

                                                                    }
                                                                    {!editStatus &&
                                                                        <label>{collaboratorsList[task.colaborador_id - 1]['nombre']}</label>
                                                                    }
                                                                </div>
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Descripcion</h6>
                                                                    {editStatus &&
                                                                        <input type="text" className="form-control" id="inputDescription" defaultValue={task.descripcion}></input>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label className="mb-3">{task.descripcion}</label>
                                                                    }
                                                                </div>
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Estado</h6>
                                                                    {editStatus &&
                                                                        <div className="mb-2">
                                                                            <select className="form-select" defaultValue={task.estado} id="inputGroupSelect02">
                                                                                <option value="PENDIENTE">PENDIENTE</option>
                                                                                <option value="EN PROCESO">EN PROCESO</option>
                                                                                <option value="FINALIZADA">FINALIZADA</option>
                                                                            </select>
                                                                        </div>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label>{task.estado}</label>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Prioridad</h6>
                                                                    {editStatus &&
                                                                        <div className="mb-2">
                                                                            <select className="form-select" defaultValue={task.prioridad} id="inputGroupSelect03">
                                                                                <option value="ALTA">ALTA</option>
                                                                                <option value="MEDIA">MEDIA</option>
                                                                                <option value="BAJA">BAJA</option>
                                                                            </select>
                                                                        </div>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label>{task.prioridad}</label>
                                                                    }
                                                                </div>
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Fecha inicio</h6>
                                                                    {editStatus &&
                                                                        
                                                                        <div>
                                                                            <DatePicker
                                                                                value={startDate}
                                                                                onChange={(newValue) => setStartDate(newValue)}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label>{task.fecha_inicio}</label>
                                                                    }
                                                                </div>
                                                                <div className="col-md-4 marginInputs">
                                                                    <h6>Fecha final</h6>
                                                                    {editStatus &&
                                                                        <div>
                                                                            <DatePicker
                                                                                value={endDate}
                                                                                onChange={(newValue) => setEndDate(newValue)}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label>{task.fecha_fin}</label>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 marginInputs">
                                                                    <h6>Notas</h6>
                                                                    {editStatus &&
                                                                        <input type="text" className="form-control" id="inputNotes" defaultValue={task.notas}></input>
                                                                    }
                                                                    {!editStatus &&
                                                                        <label className="mb-3">{task.notas}</label>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {editStatus &&
                                                                    <div className='btns-center'>
                                                                        <div className="row">
                                                                            <div className="col-md-3 marginInputs btns-edit">
                                                                                <button className="btn btn-danger" type="button" onClick={() => toggleCancel()}>Cancelar</button>
                                                                            </div>
                                                                            <div className="col-md-3 marginInputs btns-edit">
                                                                                <button className="btn btn-success" type="button" onClick={() => toggleConfirmEdit(task)}>Confirmar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                }
                                                                {!editStatus && task.estado != 'FINALIZADA' &&
                                                                    <button className="btn btn-primary" type="button" onClick={() => toggleEdit(task, index)}>Editar</button>
                                                                }
                                                            </div>
                                                        </form>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </div>
                                        ))}
                                    </Accordion>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-padding'>
                        <h6>Descripcion</h6>
                        <input type="text" className="form-control" id="inputDescriptionModal" placeholder='Agregue una descripcion...'></input>
                    </div>
                    <div className='modal-padding'>
                        <h6>Encargado</h6>
                        <div className="mb-2">
                            <select className="form-select" id="inputGroupSelect01Modal">
                                {collaboratorsList.map((collaborator, index2) => (
                                    <option key={index2} value={collaborator.id}>{collaborator.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='modal-padding'>
                        <h6>Estado</h6>
                        <div className="mb-2">
                            <select className="form-select" defaultValue="PENDIENTE" id="inputGroupSelect02Modal">
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="EN PROCESO">EN PROCESO</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-padding'>
                        <h6>Prioridad</h6>
                        <div className="mb-2">
                            <select className="form-select" id="inputGroupSelect03Modal">
                                <option value="ALTA">ALTA</option>
                                <option value="MEDIA">MEDIA</option>
                                <option value="BAJA">BAJA</option>
                            </select>
                        </div>
                    </div>
                    <div className='modal-padding'>
                        <h6>Fecha inicio</h6>
                        <DatePicker
                            value={startDateModal}
                            onChange={(newValue) => SetStartDateModal(newValue)}
                        />
                    </div>
                    <div>
                        <h6 className='modal-padding'>Fecha final</h6>
                        <DatePicker
                            value={endDateModal}
                            onChange={(newValue) => setEndDateModal(newValue)}
                        />
                    </div>
                    <div className='modal-padding'>
                        <h6>Notas</h6>
                        <input type="text" className="form-control" id="inputNotesModal" placeholder='Agregue una nota...'></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={addNewTask}>
                        Agregar Tarea
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AccordionBoostrap