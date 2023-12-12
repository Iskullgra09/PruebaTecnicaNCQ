import * as React from 'react';
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './AccordionBoostrap.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function AccordionBoostrap() {

    const [tasksList, setTasksList] = useState([]);
    const [collaboratorsList, setcollaboratorsList] = useState([]);
    const [accordion, setAccordion] = useState(-1);
    const [editStatus, setEditStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [startDateModal, SetStartDateModal] = useState(null);
    const [endDateModal, setEndDateModal] = useState(null);
    const [startDateFilter, SetStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [filter2, setFilter2] = useState(false);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [alertType, setAlertType] = useState('success');
    const [elimanteTaskID, setElimanteTaskID] = useState(-1);
    const [requiredFieldModal, setRequiredFieldModal] = useState(null);
    const [requiredField, setRequiredField] = useState(null);
    const [filterOption, setFilterOption] = useState(null);


    useEffect(() => {
        getCollaborators();
        getTasks('', 'All');
    }, []);

    const getTasks = (filter, filterType) => {
        setLoading(true);
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
                if (data.success) {
                    console.log(data)
                    formatDates(data.data)
                }
                else {
                    console.log(data.error)
                    setAlert('Error al traer los datos de las tareas')
                    setAlertType('danger')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                }


            })
            .catch(error => console.error(error));
    }

    const formatDates = (tasks) => {

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].fecha_inicio = tasks[i].fecha_inicio.split('T')[0];
            tasks[i].fecha_fin = tasks[i].fecha_fin.split('T')[0];
        }
        setLoading(false);
        setTasksList(tasks);
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
                if (data.success) {
                    console.log(data)
                    setcollaboratorsList(data.data)
                }
                else {
                    console.log(data.error)
                    setAlert('Error al traer los datos de los colaboradores')
                    setAlertType('danger')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                }

            })
            .catch(error => {
                console.error(error);
                setAlert('Error al traer los datos, vuelva a intentarlo')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 5000);
            });
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
        setRequiredField(null);
    }

    function toggleConfirmEdit(index, id) {


        var description = document.getElementById('inputDescription' + index).value;
        var collaborator_id = document.getElementById('inputGroupSelect01' + index).value;
        var state = document.getElementById('inputGroupSelect02' + index).value;
        var priority = document.getElementById('inputGroupSelect03' + index).value;
        var startDateTemp = dayjs(startDate).format('YYYY-MM-DD');
        var endDateTemp = dayjs(endDate).format('YYYY-MM-DD');
        var notes = document.getElementById('inputNotes' + index).value;

        if (collaborator_id == '-1' && state != 'PENDIENTE') {
            setRequiredField('collaborator');
        }
        else if (description == '') {
            setRequiredField('description');
        }
        else if (collaborator_id == '-1') {
            collaborator_id = null
        }
        else {
            setRequiredField(null);

            const bodyData = {
                id: id,
                description: description,
                collaborator_id: collaborator_id,
                state: state,
                priority: priority,
                startDate: startDateTemp,
                endDate: endDateTemp,
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
                    if (data.success) {
                        setAlert('Se ha editado la tarea con exito')
                        setAlertType('success')
                        setTimeout(() => {
                            setAlert(null)
                        }, 5000);
                        getTasks('', 'All');
                        toggleCancel()
                    }
                    else {
                        console.log(data.error)
                        setAlert('Algo ha salido mal, no se pudo editar la tarea')
                        setAlertType('danger')
                        setTimeout(() => {
                            setAlert(null)
                        }, 5000);
                    }


                })
                .catch(error => {
                    console.error(error);
                    setAlert('Algo ha salido mal, vuelva a intentarlo')
                    setAlertType('danger')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                })
        }
    }

    function chooseFilter1(choise) {
        console.log(choise);
        if (choise == 'Fechas') {
            setFilterOption('dates');
            setTimeout(() => { }, 2000);
        }
        else if (choise == 'Todas') {

            if (filterOption == 'noDates') {
                setTimeout(() => {
                
                    var select = document.getElementById('inputGroupSelect05')
    
                    while (select.hasChildNodes()) {
                        select.removeChild(select.firstChild)
                    }
    
                    setFilter2(false);
                    setFilterOption(null);
                }, 500);
            }
            setFilterOption(null);
        }
        else if (choise == 'Estado') {
            setFilterOption('noDates');
            setTimeout(() => {
                var select = document.getElementById('inputGroupSelect05')

                while (select.hasChildNodes()) {
                    select.removeChild(select.firstChild)
                }

                let option0 = document.createElement("option");
                option0.setAttribute("value", "-1");
                let option0Texto = document.createTextNode("Selecciona un estado...");
                option0.appendChild(option0Texto);

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

                select.appendChild(option0);
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);

                setFilter2(true);
            }, 500);

        }
        else if (choise == 'Colaborador') {
            setFilterOption('noDates');
            setTimeout(() => {
                var select = document.getElementById('inputGroupSelect05')

                while (select.hasChildNodes()) {
                    select.removeChild(select.firstChild)
                }

                let option0 = document.createElement("option");
                option0.setAttribute("value", "-1");
                let option0Texto = document.createTextNode("Seleccione un colaborador...");
                option0.appendChild(option0Texto);

                select.appendChild(option0);

                collaboratorsList.forEach(collaborator => {
                    let newOption = document.createElement("option");
                    newOption.setAttribute("value", collaborator.id);
                    let newOptionText = document.createTextNode(collaborator.nombre);
                    newOption.appendChild(newOptionText);
                    select.appendChild(newOption);
                });

                setFilter2(true);
            }, 500);

        }
        else if (choise == 'Prioridad') {
            setFilterOption('noDates');
            setTimeout(() => {
                var select = document.getElementById('inputGroupSelect05')

                while (select.hasChildNodes()) {
                    select.removeChild(select.firstChild)
                }

                let option0 = document.createElement("option");
                option0.setAttribute("value", "-1");
                let option0Texto = document.createTextNode("Seleccione una prioridad...");
                option0.appendChild(option0Texto);

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

                select.appendChild(option0);
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);

                setFilter2(true);
            }, 500);

        }
    }

    function chooseFilter2(choise) {
        console.log(choise);
    }

    function toggleFilter() {
        var filterType = document.getElementById('inputGroupSelect04').value
        var filter;

        if (filterType == 'Todas') {
            getTasks('', 'All');
        }
        else if (filterType == 'Colaborador') {
            filter = document.getElementById('inputGroupSelect05').value
            if (filter == '-1') {
                setAlert('Debe seleccionar un colaborador')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 3000);
            }
            else {
                getTasks(filter, 'Collaborator');
            }

        }
        else if (filterType == 'Prioridad') {
            filter = document.getElementById('inputGroupSelect05').value
            if (filter == '-1') {
                setAlert('Debe seleccionar una prioridad')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 3000);
            }
            else {
                getTasks(filter, 'Priority');
            }
        }
        else if (filterType == 'Estado') {
            filter = document.getElementById('inputGroupSelect05').value
            if (filter == '-1') {
                setAlert('Debe seleccionar un estado')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 3000);
            }
            else {
                getTasks(filter, 'State');
            }

        }
        else if (filterType == 'Fechas') {
            var startDateTemp = dayjs(startDateFilter).format('YYYY-MM-DD');
            var endDateTemp = dayjs(endDateFilter).format('YYYY-MM-DD');

            filter = startDateTemp + "/" + endDateTemp;

            if (startDateFilter == null || endDateFilter == null) {
                setAlert('Debe seleccionar las fechas')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 3000);
            }
            else {
                console.log(filter)
                getTasks(filter, 'Date');
            }
        }

    }

    const handleCloseNewTaskModal = () => setNewTaskModal(false);
    const handleShowNewTaskModal = () => setNewTaskModal(true);

    const handleCloseDeleteTaskModal = () => setDeleteTaskModal(false);
    const handleShowDeleteTaskModal = (id) => {
        setElimanteTaskID(id);
        setDeleteTaskModal(true);
    };

    const addNewTask = () => {
        var description = document.getElementById('inputDescriptionModal').value
        var collaborator_id = parseInt(document.getElementById('inputGroupSelect01Modal').value)
        var state = document.getElementById('inputGroupSelect02Modal').value
        var priority = document.getElementById('inputGroupSelect03Modal').value
        var startDateTemp = dayjs(startDateModal).format('YYYY-MM-DD')
        var endDateTemp = dayjs(endDateModal).format('YYYY-MM-DD')
        var notes = document.getElementById('inputNotesModal').value

        if (collaborator_id == '-1') {
            collaborator_id = null
        }

        if (description == '') {
            setRequiredFieldModal('description');
        }
        else if (startDateModal == null) {
            setRequiredFieldModal('startDate');
        }
        else if (endDateModal == null) {
            setRequiredFieldModal('endDate');
        }
        else {
            setRequiredFieldModal(null);
            const bodyData = {
                description: description,
                collaborator_id: collaborator_id,
                state: state,
                priority: priority,
                startDate: startDateTemp,
                endDate: endDateTemp,
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
                    if (data.success) {
                        setAlert('Se ha creado la tarea con exito')
                        setAlertType('success')
                        setTimeout(() => {
                            setAlert(null)
                        }, 5000);
                        getTasks('', 'All');
                        handleCloseNewTaskModal();
                    }
                    else {
                        console.log(data.error)
                        setAlert('Algo ha salido mal, no se pudo agregar la tarea')
                        setAlertType('danger')
                        setTimeout(() => {
                            setAlert(null)
                        }, 5000);
                    }


                })
                .catch(error => {
                    console.error(error);
                    setAlert('Algo ha salido mal, vuelva a intentarlo')
                    setAlertType('danger')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                });
        }
    }

    const eliminateTask = () => {
        console.log('ELIMINAR')
        const bodyData = {
            id: elimanteTaskID,
        }
        console.log(bodyData);

        const endPoint = 'http://127.0.0.1:3000/task/deleteTask';

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
                if (data.success) {
                    setAlert('Se ha eliminado la tarea con exito')
                    setAlertType('success')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                    getTasks('', 'All');
                    handleCloseDeleteTaskModal();
                }
                else {
                    console.log(data.error)
                    setAlert('Algo ha salido mal, no se pudo eliminar la tarea')
                    setAlertType('danger')
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000);
                }


            })
            .catch(error => {
                console.error(error);
                setAlert('Algo ha salido mal, vuelva a intentarlo')
                setAlertType('danger')
                setTimeout(() => {
                    setAlert(null)
                }, 5000);
            });
    }
    return (
        <>
            <h1 className='titulo'>
                Organizador de tareas
            </h1>
            {tasksList.length > 0 && collaboratorsList.length > 0 &&
                <div className='centerCard'>
                    <div>
                        <div className="card text-center">
                            <div className="card-body">
                                <div className='row'>
                                    {filterOption == null &&
                                        <div className="col-md-8 marginInputs">
                                            <>
                                            </>
                                        </div>
                                    }
                                    {filterOption == 'noDates' &&
                                        <div className="col-md-4 marginInputs">
                                            <>
                                            </>
                                        </div>
                                    }
                                    {filterOption == 'dates' &&
                                        <div className="col-md-2 marginInputs">
                                            <>
                                            </>
                                        </div>
                                    }
                                    <div className='col-md-2 marginInputs'>
                                        <select className="form-select" id="inputGroupSelect04" defaultValue="Todas" onChange={(e) => chooseFilter1(e.target.value)}>
                                            <option value="Todas">Todas</option>
                                            <option value="Colaborador">Colaborador</option>
                                            <option value="Estado">Estado</option>
                                            <option value="Prioridad">Prioridad</option>
                                            <option value="Fechas">Fechas</option>
                                        </select>
                                    </div>

                                    {filterOption == 'noDates' &&
                                        <div className='col-md-4 marginInputs'>
                                            <select disabled={!filter2 ? 'disabled' : ''} className="form-select" id="inputGroupSelect05" onChange={(e) => chooseFilter2(e.target.value)}>

                                            </select>
                                        </div>
                                    }
                                    {filterOption == 'dates' &&
                                        <>
                                            <div className='col-md-3'>
                                                <DatePicker
                                                    className='datepickers-height'
                                                    value={startDateFilter}
                                                    onChange={(newValue) => SetStartDateFilter(newValue)}
                                                />
                                            </div>
                                            <div className='col-md-3'>
                                                <DatePicker
                                                    className='datepickers-height'
                                                    value={endDateFilter}
                                                    onChange={(newValue) => setEndDateFilter(newValue)}
                                                />
                                            </div>
                                        </>
                                    }

                                    <div className="col-md-2 marginInputs">
                                        <button className="btn btn-primary" type="button" onClick={() => toggleFilter()}>Filtrar</button>
                                    </div>


                                    <div>
                                        {loading &&
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        }
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
                                                                                <select className="form-select" defaultValue={task.colaborador_id} id={"inputGroupSelect01" + index}>
                                                                                    <option value="-1"> Seleccione un colaborador... </option>
                                                                                    {collaboratorsList.map((collaborator, index2) => (
                                                                                        <option key={index2} value={collaborator.id}>{collaborator.nombre}</option>
                                                                                    ))}
                                                                                </select>
                                                                                {requiredField == 'collaborator' &&
                                                                                    <span className='required-field'>*Campo requerido</span>
                                                                                }
                                                                            </div>

                                                                        }
                                                                        {!editStatus && task.colaborador_id != null &&
                                                                            <label>{collaboratorsList[task.colaborador_id - 1]['nombre']}</label>
                                                                        }
                                                                    </div>
                                                                    <div className="col-md-4 marginInputs">
                                                                        <h6>Descripcion</h6>
                                                                        {editStatus &&
                                                                            <input type="text" className="form-control" id={"inputDescription" + index} defaultValue={task.descripcion}></input>
                                                                        }
                                                                        {!editStatus &&
                                                                            <label className="mb-3">{task.descripcion}</label>
                                                                        }
                                                                        {requiredField == 'description' &&
                                                                            <span className='required-field'>*Campo requerido</span>
                                                                        }
                                                                    </div>
                                                                    <div className="col-md-4 marginInputs">
                                                                        <h6>Estado</h6>
                                                                        {editStatus &&
                                                                            <div className="mb-2">
                                                                                <select className="form-select" defaultValue={task.estado} id={"inputGroupSelect02" + index}>
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
                                                                                <select className="form-select" defaultValue={task.prioridad} id={"inputGroupSelect03" + index}>
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
                                                                            <input type="text" className="form-control" id={"inputNotes" + index} defaultValue={task.notas}></input>
                                                                        }
                                                                        {!editStatus &&
                                                                            <label className="mb-3">{task.notas}</label>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {editStatus &&
                                                                        <div >
                                                                            <button className="btn btn-danger btns-center" type="button" onClick={() => toggleCancel()}>Cancelar</button>
                                                                            <button className="btn btn-success" type="button" onClick={() => toggleConfirmEdit(index, task.id)}>Confirmar</button>
                                                                        </div>

                                                                    }
                                                                    {!editStatus && task.estado != 'EN PROCESO' &&
                                                                        <button className="btn btn-danger btns-center" type="button" onClick={() => handleShowDeleteTaskModal(task.id)}>Eliminar</button>
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
            }


            {alert &&
                <div className='alert-flotante'>
                    <Alert key="1" variant={alertType}>
                        {alert}
                    </Alert>
                </div>

            }

            <button type="button" className="btn btn-warning btn-flotante" onClick={handleShowNewTaskModal}>
                <i className="bi bi-clipboard-plus-fill icon-btn-flotante"></i>
            </button>

            <Modal show={newTaskModal} onHide={handleCloseNewTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-padding'>
                        <h6>Descripcion</h6>
                        <input type="text" className="form-control" id="inputDescriptionModal" placeholder='Agregue una descripcion...'></input>
                        {requiredFieldModal == 'description' &&
                            <span className='required-field'>*Campo requerido</span>
                        }
                    </div>
                    <div className='modal-padding'>
                        <h6>Encargado</h6>
                        <div className="mb-2">
                            <select className="form-select" id="inputGroupSelect01Modal">
                                <option value="-1"> Seleccione un colaborador... </option>
                                {collaboratorsList.map((collaborator, index2) => (
                                    <option key={index2} value={collaborator.id}>{collaborator.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='modal-padding'>
                        <h6>Estado</h6>
                        <div className="mb-2">
                            <select disabled className="form-select" defaultValue="PENDIENTE" id="inputGroupSelect02Modal">
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
                    <div className='modal-padding row'>
                        <div className='col-md-6'>
                            <h6>Fecha inicio</h6>
                            <DatePicker
                                value={startDateModal}
                                onChange={(newValue) => SetStartDateModal(newValue)}
                            />
                            {requiredFieldModal == 'startDate' &&
                                <span className='required-field'>*Campo requerido</span>
                            }
                        </div>
                        <div className='col-md-6'>
                            <h6>Fecha final</h6>
                            <DatePicker
                                value={endDateModal}
                                onChange={(newValue) => setEndDateModal(newValue)}
                            />
                            {requiredFieldModal == 'endDate' &&
                                <span className='required-field'>*Campo requerido</span>
                            }
                        </div>
                    </div>
                    <div className='modal-padding'>
                        <h6>Notas</h6>
                        <input type="text" className="form-control" id="inputNotesModal" placeholder='Agregue una nota...'></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseNewTaskModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={addNewTask}>
                        Agregar Tarea
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteTaskModal} onHide={handleCloseDeleteTaskModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>¿Está seguro que desea eliminar la tarea?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseDeleteTaskModal}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={eliminateTask}>
                        Eliminar Tarea
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AccordionBoostrap