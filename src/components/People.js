import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * Componente para cargar personas de la base de datos 
 */
function People(){
    const url = 'http://localhost/devtestAPI/';     //Dirección de la API
    const [people, setPeople] = useState([]);       //Arreglo de elementos de la base de datos
    const [dataLoaded, setDataLoaded] = useState(false);        //controlador para la carga de datos
    const formatter = new Intl.NumberFormat('en-US',{style:'currency', currency:'USD'});    //Formato para dinero, moneda 'USD'

    //Efectuando petición de la API, sin dependencias
    useEffect(() => {
        fetch(url)                              //Url por defecto metodo GET
        .then(response => response.json())      //Leer respuesta en formato JSON
        .then((data) => {
            setPeople(data);                    //Asignando información de respuesta al arreglo people
            setDataLoaded(true);                //Corroborando carga completa
        })
        .catch((err) => {
            console.log(err.message);           //Mostrando mensaje de error en caso de haberlo
        })
    }, []);

    /**
     * Función para ejecutar la petición de borrado 
     * @param {integer} id 
     */
    const deletePerson = async(id) => {
        //Usando promesa de toast para mostrar una notificación ante el resultado obtenido
        await toast.promise(fetch(url, {
            method: 'DELETE',               //Definiendo método DELETE para borrar
            body: JSON.stringify({
                id
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            //Evaluando respuesta con código 200 
            if(response.status === 200){
                setPeople(
                    //Filtro para eliminar el resgistro eliminado 
                    people.filter((people) => {return people.id !== id})
                    );
            }
            else
            {return};
        })
        .catch((err) => {
            console.log(err.message);       //Mostrando error 
        }),
            //Valores de respuesta para la promesa de notificación
            {
                success: 'Eliminado con exito',
                error: 'Algo salió mal'
            }
        );
    }

    /* Mostrar animación de carga de datos */
    while(!dataLoaded){
        return(
            //Contenedor principal
            <div className="flex-1 grid place-items-center content-center">
                {/* Spinner */}
                <div class="inline-block h-8 w-8 animate-spin text-neutral-100 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        )
    }
    return (
    //Contenedor principal ocupando el resto de espacio luego del título
    <div className="flex-1 space-y-5 px-5 md:px-44">
        {/* Botón para agregar a una persona */}
        <div className='py-4 px-2 text-center'>
            <Link to="create" state={{person: null}} className='py-4 px-2 border-lime-500 border-2 text-lime-500 hover:bg-gradient-to-r hover:from-lime-400 hover:to-lime-500  hover:text-white font-semibold rounded-2xl'>AGREGAR</Link>
        </div>
        {/* Tabla con la informacion del arreglo people */}
        <div className="overflow-auto max-h- rounded-xl shadow-lg">
            <table className="w-full">
                {/* Encabezados de la tabla */}
                <thead className="bg-gradient-to-tl from-red-400 to-fuchsia-600 border-b-4 text-slate-50 border-gray-800">
                    <tr>
                        <td className="w-14 p-3 text-sm font-semibold tracking-wide text-center">ID</td>
                        <td className="p-3 text-sm font-semibold tracking-wide text-center">Nombre</td>
                        <td className="p-3 text-sm font-semibold tracking-wide text-center">Apellido</td>
                        <td className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Edad</td>
                        <td className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Salario</td>
                        <td className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Acciones</td>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 ">
                    {/* Mostrando todos los registros*/}
                    {people.map(
                        (person)=>(
                            <tr key={person.id} className="bg-gray-50 text-yellow-900 hover:bg-gradient-to-r hover:from-violet-200 hover:to-pink-200 hover:shadow-lg">
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap">{person.id}</td>
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap">{person.nombre}</td>
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap">{person.apellido}</td>
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap">{person.fechaNacimiento}</td>
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap">{formatter.format(person.salario)}</td>
                                <td className="p-3 text-md  text-gray-700 whitespace-nowrap text-center space-x-1">
                                    {/* Boton para modificar un registro */}
                                    <button className="px-4 py-1 bg-blue-600 text-white font-medium origin-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-violet-500 rounded-xl">
                                        <Link to='/modificar' state={{person}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:-rotate-45">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                    </button>
                                    {/* Boton para eliminar un registro */}
                                    <button onClick={() => deletePerson(person.id)} className="px-4 py-1 bg-red-600 text-white font-medium origin-center hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 hover:text-cyan-100 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:-rotate-45">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                        )}
                </tbody>
            </table>
        </div>
        {/* Componente para mostrar notificación */}
        <ToastContainer/>
    </div>
    );
}

export default People;