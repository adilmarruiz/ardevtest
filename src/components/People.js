import React from "react";

class People extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { 
            dataLoaded: false,
            people: []
        };
    }

    loadData(){
        fetch("http://localhost/devtestAPI/")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({
                dataLoaded: true,
                people: data});
        })
        .catch()
    }

    componentDidMount(){
        this.loadData();
    }

    render(){
        const{dataLoaded, people} = this.state;

        return (
        <div className="container mx-auto">
            <table className="w-full p-8 border-collapse block md:table text-zinc-900 rounded">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative">
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">ID</td>
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Nombre</td>
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Apellido</td>
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Edad</td>
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Salario</td>
                        <td className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Acciones</td>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {people.map(
                        (person)=>(
                            <tr key={person.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row hover:bg-sky-900 hover:text-zinc-50">
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{person.id}</td>
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{person.nombre}</td>
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{person.apellido}</td>
                                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">{person.fechaNacimiento}</td>
                                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">${person.salario}</td>
                                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell space-x-4">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
					                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                                </td>
                            </tr>
                        )
                        )}
                </tbody>
            </table>
        </div>
        );
    }
}

export default People;