import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Componente para agregar y modificar una persona 
 */
function NewPerson(){
    const url = 'http://localhost/devtestAPI/';     //dirección de la API
    const [id, setId] = useState('Autogenerado');   //Creación de ID
    const [nombre, setNombre] = useState('');       //Creación de nombre
    const [apellido,setApellido] = useState('');    //Creación de apellido
    const [fechaNac,setFechaNac] = useState('');    //Creación de fecha de nacimiento
    const [salario,setSalario] = useState('');      //Creación de salario
    const location = useLocation();                 //Creación de location
    const navigate = useNavigate();                 //Creación de navigate

    const {person} = location.state;                //Obteniendo objeto

    //Validación de objeto y si está creado asignar valores a variables, como dependencia "person"
    useEffect(() => {
        if(person != null){
            setId(person.id);
            setNombre(person.nombre);
            setApellido(person.apellido);
            setFechaNac(person.fechaNacimiento);
            setSalario(person.salario);
        }
    },[person]);

    /**
     * Enviar petición al servidor
     * @param {string} method 
     * @param {object} data 
     */
    const sendData = async(method, data) => {
        fetch(url, {
            method,
            body: JSON.stringify(data),                 //Configurando información de envío
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if(response.status === 200){
                navigate('/');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    /**
     * Limpiar valores ingresados anteriormente
     */
    const deleteValues = () => {
        if(person === null){            //Verificación si el objeto person existe o no
            setNombre('');              //se debe efectuar si el objeto no existe
            setApellido('');
            setFechaNac('');
            setSalario('');
        }
    }

    /**
     * Validación de información y envío a metodo de petición en API.
     * Si el objeto persona existe es una modificación y si no existe una creación
     * @param {integer} id 
     * @param {string} nombre 
     * @param {string} apellido 
     * @param {string} fechaNacimiento 
     * @param {double} salario 
     */
    const validate = (id,nombre, apellido, fechaNacimiento, salario) => {
        var method;
        var data;
        data = {id, nombre, apellido, fechaNacimiento, salario};
        method = person == null ? 'POST':'PUT';
        sendData(method, data);
    }
    
    /**
     * Manejo de evento para envío de formulario
     * @param {*} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        validate(id,nombre, apellido, fechaNac, salario);
    }
    
    return(
        //Contenedor principal con uso de espacio restante en pantalla
        <div className="flex-1 grid place-items-center content-center">
            <div className="w-full md:w-2/4 p-6 shadow-lg rounded-lg bg-white">
                {/* Titulo */}
                <h1 className="text-3xl block text-center font-semibold">
                    {person == null ? 'Agregar Persona':'Modificar Persona'}
                </h1>
                <hr className="mt-3"/>
                {/* Formulario para captura de datos para modificar y agregar */}
                <form onSubmit={handleSubmit}>
                    <div className="mt-3 text-center">
                        <label htmlFor="id" className="block text-base mb-2">ID</label>
                        <input type="text" id="id" value={id} className="border w-32 text-base px-2 py-1 text-center focus:outline-none focus:ring-0 focus:bg-gray-400" placeholder="Ingrese nombre..." readOnly disabled/>
                    </div>
                    <div className="mt-3 text-center">
                        <label htmlFor="nombre" className="block text-base mb-2">Nombre</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:bg-gray-400" placeholder="Ingrese nombre..." required/>
                    </div>
                    <div className="mt-3 text-center">
                        <label htmlFor="apellido" className="block text-base mb-2">Apellido</label>
                        <input type="text" id="apellido" value={apellido} onChange={(e) => {setApellido(e.target.value)}} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:bg-gray-400" placeholder="Ingrese apellido..." required/>
                    </div>
                    <div className="grid-none md:grid md:grid-rows-1 md:grid-flow-col md:gap-4">
                        <div className="mt-3 text-center">
                            <label htmlFor="fechaNacimiento" className="block text-base mb-2">Fecha de Nacimiento</label>
                            <input type="date" id="fechaNacimiento" value={fechaNac} onChange={(e) => {setFechaNac(e.target.value)}} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:bg-gray-400" placeholder="Ingrese fecha de nacimiento..." pattern="\d{4}-\d{2}-\d{2}" required/>
                        </div>
                        <div className="mt-3 text-center">
                            <label htmlFor="salario" className="block text-base mb-2">Salario</label>
                            <input type="number" step="0.01" id="salario" value={salario} onChange={(e) => {setSalario(e.target.value)}} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:bg-gray-400" placeholder="Ingrese salario..." required/>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className="mt-5 w-full inline-grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center items-center justify-center">
                        {/* Envío de formulario */}
                        <button type="submit" className="block w-full md:w-auto border-2 border-indigo-700 bg-indigo-700 text-gray-50 py-1 px-5 hover:bg-transparent hover:text-indigo-700 rounded-xl">ENVIAR DATOS</button>
                        {/* Limpieza de campos de formulario */}
                        <button type="button" onClick={() => deleteValues()} className="block w-full md:w-auto border-2 border-indigo-700 bg-indigo-700 text-gray-50 py-1 px-5 hover:bg-transparent hover:text-indigo-700 rounded-xl">LIMPIAR</button>
                        {/* Cancelar y volver a mostrar los registros */}
                        <button type="button" className="block w-full md:w-auto border-2 border-indigo-700 bg-indigo-700 text-gray-50 py-1 px-5 hover:bg-transparent hover:text-indigo-700 rounded-xl">
                            <Link to="/" className="text-center">CANCELAR</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NewPerson;