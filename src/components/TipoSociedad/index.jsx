import React, { useEffect, useState } from 'react';
import './TipoSociedad.css'
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa"

const TipoSociedad = ({personeria, tipoSociedad}) => {
    
    const [firmantes, setFirmantes] = useState ([])

    useEffect(() => {

    if(personeria !== 'pj') {
        setFirmantes([])
        return
    } 

    let defaultRow=[]
    switch (tipoSociedad) {
        case 'coop':
            defaultRow = [
                {nombre:'',cuit:'',cargo:'',required:true},
                {nombre:'',cuit:'',cargo:'',required:true},
                {nombre:'',cuit:'',cargo:'',required:true},
            ]
            break;
        case 'sa':
        case 'sas':
        case 'sau':    
            defaultRow = [
                {nombre:'',cuit:'',cargo:'',required:true},
            ]
            break;
        case 'srl':    
            defaultRow = [
                {nombre:'',cuit:'',cargo:'',required:true},
                {nombre:'',cuit:'',cargo:'',required:false},
            ]
            break;
        case 'iv':
        case 'sh':     
            defaultRow = [
                {nombre:'',cuit:'',cargo:'',required:true},
                {nombre:'',cuit:'',cargo:'',required:true},
                {nombre:'',cuit:'',cargo:'',required:false},
                {nombre:'',cuit:'',cargo:'',required: false},
            ]
            break;
        default:
            defaultRow=[]
            break;
        }
        setFirmantes(defaultRow)

    }, [personeria, tipoSociedad])

    const handleChange = (index, field, value)=>{
        const updated = [...firmantes]
        updated[index][field] = value
        setFirmantes(updated)
    }

    const addFirmante = ()=>{
        setFirmantes([...firmantes, { nombre: '', cuit: '', cargo: '', required: false }]);
    }

    const removeFirmante = (index)=>{
        const updated = firmantes.filter((_, i)=>i !==index)
        setFirmantes(updated)
    }

    return(
        <>
        {tipoSociedad!=='' && (<h3 className='tituloDos'>Firmantes</h3>
        )}
        {firmantes.map ((f, i)=> (
            <div className='container-general' key={i}>
                <div className='container-firmantes'>
                    <div className='grupoFirmante'>
                        <label className='labelFirmante' htmlFor="nombreFirmante">Nombre y Apellido</label>
                        <input 
                        className='campoFirmante'
                        type="text"
                        name='nombreFirmante'
                        value={f.nombre}
                        placeholder='Ingrese Nombre y Apellido' 
                        onChange={(e)=>{handleChange(i, 'nombre', e.target.value)}}
                        required={f.required}
                        />
                    </div>
                    <div className='grupoFirmante'>
                        <label className='labelFirmante' htmlFor="cuitFirmante">CUIT/L</label>
                        <input 
                            className='campoFirmante'
                            type="text"
                            name='cuitFirmante'
                            value={f.cuit}
                            placeholder='Ingrese el CUIT/L' 
                            onChange={(e)=>{handleChange(i, 'cuit', e.target.value)}}
                            required={f.required}
                        />
                    </div>   
                    <div className='grupoFirmante'>
                        <label className='labelFirmante' htmlFor="cargoFirmante">Cargo</label>
                        <select className='campoFirmante' name="cargoFirmante" value={f.cargo} onChange={(e)=>{handleChange(i, 'cargo', e.target.value)}} required={f.required}>
                            <option value="" disabled hidden>Elija una opcion</option>
                            <option value="apoderado">Apoderado/a</option>
                            <option value="presidente">Presidente/a</option>
                            <option value="secretario">Secretario/a</option>
                            <option value="socioGerente">Socio Gerente</option>
                            <option value="tesorero">Tesorero/a</option>
                            <option value="tomador">Tomador/a</option>
                            <option value="administrador">Administrador/a</option>
                            <option value="porSi">Por si y en representacion de</option>
                            <option value="delegado">Delegado/a</option>
                            <option value="socio">Socio/a</option>
                        </select>
                    </div>
                </div>
                <div className='container-trash'>
                    {f.required && (<button disabled type="button" className="btnTrash"><FaTrash style={{color:'transparent', fontSize:'20px'}} /></button>)}
                    {!f.required && (<button type="button" className="btnTrash" onClick={() => removeFirmante(i)}><FaTrash title="Eliminar firmante" style={{color:'black', fontSize:'20px'}} /></button>)}
                </div>
            </div>
        )
        )}
        {tipoSociedad!=='' && (<button className='btnAgregar' type="button" onClick={addFirmante}>Agregar Firmante <FaPlus /></button>
        )}
        </>
    )
}

export{TipoSociedad}