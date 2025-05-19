import React, { useState } from 'react';
import './Contrag.css'
import { TipoContragarantia } from '../TipoContragarantia';


const tipoContrag = [
    {value:'solaFirma', label:"A sola firma"},
    {value:'fianza', label:"Fianza de 3ros"}, 
    {value:'hipotecaNaval', label:"Hipoteca 1er grado Naval"}, 
    {value:'hipotecaUno', label:"Hipoteca 1er grado"}, 
    {value:'hipotecaDos', label:"Hipoteca 2do grado"}, 
    {value:'prendaGanado', label:"Prenda fija 1er grado - Ganado"}, 
    {value:'prendaOtrosUno', label:"Prenda fija 1er grado - Otros"}, 
    {value:'prendaOtrosDos', label:"Prenda fija 2do grado - Otros"},  
    {value:'prendaOtrosTres', label:"Prenda Fija 3er grado - Otro"}, 
    {value:'sprendaRodadosUno', label:"Prenda fija 1er grado - Rodados"}, 
    {value:'sprendaRodadosDos', label:"Prenda fija 2do grado - Rodados"},
    {value:'sprendaRodadosTres', label:"Prenda fija 3er grado - Rodados"},
]

const columnas = [
    {value:'nombreApellido', label:"Nombre y Apellido"}, 
    {value:'cuit', label:"CUIT/L"},
    {value:'descripcion', label:"Descripcion"},
    {value:'moneda', label:"Moneda"},
    {value:'valor', label:"Valor en moneda original"},
    {value:'marca', label:"Marca"},
    {value:'modelo', label:"Modelo"},
    {value:'numeroSerie', label:"N° de serie"},
    {value:'calle', label:"Calle o Nombre del Campo"},
    {value:'numero', label:"N°"},
    {value:'piso', label:"Piso"},
    {value:'depto', label:"Depto"},
    {value:'localidad', label:"Localidad"},
    {value:'partido', label:"Partido"},
    {value:'provincia', label:"Provincia"},
    {value:'cp', label:"Codigo Postal"},
    {value:'fuente', label:"Fuente"},
]


const Contrag = () => {

    const [tipo, setTipo] = useState ('')
    const [cotizaciones, setCotizaciones] = useState({ dolar: 0, euro: 0 });
    const [registros, setRegistros] = useState([]);
    
    const handleAgregarRegistro = (nuevoRegistro) => {
    setRegistros([...registros, { ...nuevoRegistro, id: registros.length + 1 }]);
    setTipo('');
    }

    const handleEliminarRegistro = (id) => {
    const actualizados = registros.filter(reg => reg.id !== id);
    setRegistros(actualizados.map((reg, index) => ({ ...reg, id: index + 1 })));
    }

    return(
        <>
            <label htmlFor="tipoContragarantia">Tipo de Contragarantia
            <select name="tipoContragarantia" value={tipo} onChange={(e)=>setTipo(e.target.value)} required>
                <option value="" disabled hidden>Elija una opcion</option>
                {tipoContrag.map(t=>(<option key={t.value} value={t.value}>{t.label}</option>))}
            </select>
            </label>  
            {tipo!=="" && <TipoContragarantia tipo={tipo} onAgregar={handleAgregarRegistro}/>}
            
            <hr/>

            <div>
                <h4>Cargar cotización</h4>
                <label>Dólar: </label>
                <input
                    type="number"
                    value={cotizaciones.dolar || ''}
                    placeholder='0'
                    onChange={(e) => setCotizaciones({ ...cotizaciones, dolar: Number(e.target.value) })}
                />
                <label>Euro: </label>
                <input
                    type="number"
                    value={cotizaciones.euro || ''}
                    placeholder='0'
                    onChange={(e) => setCotizaciones({ ...cotizaciones, euro: Number(e.target.value) })}
                />
            </div>
            <hr />
            <h3>Registros cargados</h3>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Item</th>
                        {columnas.map(col => (<th key={col.value}>{col.label}</th>))}
                        <th>Valor en pesos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map(reg => {
                        const valor = Number(reg.valor || 0);
                        const factor = reg.moneda === 'Dólares' ? Number(cotizaciones.dolar) || 0: reg.moneda === 'Euros' ? Number(cotizaciones.euro) || 0 : 1;
                        const valorEnPesos = valor * factor;
                    
                        return (
                            <tr key={reg.id}>
                                <td>{reg.id}</td>
                                {columnas.map(col => (<td key={col.value}>{reg[col.value] || ''}</td>))}
                                <td>{valorEnPesos.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleEliminarRegistro(reg.id)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
        
    )
}

export{Contrag}

