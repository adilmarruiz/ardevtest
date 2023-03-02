import React from "react";

class NewPerson extends React.Component{

    render(){
        return(
            <div className="container mx-auto">
                <div class="flex items-center justify-center p-5">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded">Agregar</button>
                    <form id="form">
                        <label>Nombre</label>
                        <input type="text" id=""/>
                        <label>Apellido</label>
                        <input type="text" id=""/>
                        <label>Fecha de Nacimiento</label>
                        <input type="date" id=""/>
                        <label>Salario</label>
                        <input type="number" step='0.01' id=""/>
                        <input type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border border-green-500 rounded"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default NewPerson;