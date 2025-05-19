import React, { useEffect, useState } from 'react';
import './TipoContragarantia.css'


const monedas = ['Dólares', 'Pesos', 'Euros'];
const fuentes = ['Cotizacion', 'DDJJ BBPP', 'EECC', 'Factura final', 'Factura proforma', 'Tasación', 'Póliza de seguro', 'MMBB', 'Titulo de propiedad'];

const camposHabilitadosPorTipo = {
    solaFirma:['nombreApellido','cuit'],
    fianza:['nombreApellido','cuit'],
    hipotecaNaval:['descripcion','moneda','valor','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    hipotecaUno:['descripcion','moneda','valor','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    hipotecaDos:['descripcion','moneda','valor','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    prendaGanado:['descripcion','moneda','valor','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    prendaOtrosUno:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    prendaOtrosDos:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    prendaOtrosTres:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    sprendaRodadosUno:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    sprendaRodadosDos:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
    sprendaRodadosTres:['descripcion','moneda','valor','marca','modelo','numeroSerie','calle','numero','piso','depto','localidad','partido','provincia','cp','fuente'],
}

const camposRequeridosPorTipo = {
    solaFirma:['nombreApellido','cuit'],
    fianza:['nombreApellido','cuit'],
    hipotecaNaval:['descripcion','moneda','valor','calle','numero','localidad','partido','provincia','cp','fuente'],
    hipotecaUno:['descripcion','moneda','valor','calle','numero', 'localidad','partido','provincia','cp','fuente'],
    hipotecaDos:['descripcion','moneda','valor','calle','numero', 'localidad','partido','provincia','cp','fuente'],
    prendaGanado:['descripcion','moneda','valor','calle','numero', 'localidad','partido','provincia','cp','fuente'],
    prendaOtrosUno:['descripcion','moneda','valor', 'calle','numero', 'localidad','partido','provincia','cp','fuente'],
    prendaOtrosDos:['descripcion','moneda','valor', 'calle','numero','localidad','partido','provincia','cp','fuente'],
    prendaOtrosTres:['descripcion','moneda','valor', 'calle','numero', 'localidad','partido','provincia','cp','fuente'],
    sprendaRodadosUno:['descripcion','moneda','valor','marca','modelo', 'calle','numero', 'localidad','partido','provincia','cp','fuente'],
    sprendaRodadosDos:['descripcion','moneda','valor','marca','modelo', 'calle','numero', 'localidad','partido','provincia','cp','fuente'],
    sprendaRodadosTres:['descripcion','moneda','valor','marca','modelo', 'calle','numero', 'localidad','partido','provincia','cp','fuente'],
}
        
    
const TipoContragarantia = ({tipo, onAgregar}) => {
    
    const [form, setForm] = useState ({})

    useEffect (() => {
        setForm ({})
        return
    }, [tipo]) 

    const isCampoHabilitado = (campo) => camposHabilitadosPorTipo[tipo]?.includes(campo)
    const isCampoRequerido = (campo) => camposRequeridosPorTipo[tipo]?.includes(campo) ?? false
 
    const handleChangeTwo = (name, value)=>{ 
        setForm({...form, [name]:value})
    }

    const agregar = (e) => {
        e.preventDefault();
        onAgregar(form)
        setForm({})
    }

    if (!tipo) return null

    const renderInput = (label, name, type, placeholder)=>{ 
        return(
            <label htmlFor={name}> {label}
                <input 
                type={type} 
                name={name}
                value={form[name] || ''}
                placeholder={placeholder}
                onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)}
                required={isCampoRequerido(name)}
                disabled={!isCampoHabilitado(name)}
                />
            </label>
        )
    }

    const renderArea = (label, name) => {
        return(
            <label htmlFor={name}>{label}
                <textarea name={name} onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)} required={isCampoRequerido(name)} disabled={!isCampoHabilitado(name)}>
                </textarea>
            </label>
        )
    }

    const renderSelect = (label, name, options)=>{ 
        return(
            <label htmlFor={name}>{label}
                <select name={name} value={form[name] || ''} onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)} required={isCampoRequerido(name)} disabled={!isCampoHabilitado(name)} >
                <option value="" disabled hidden>Elija una opcion</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </label>
        )
    }


    return(
        <>
        <form action="#" onSubmit={agregar}>
            {isCampoHabilitado('nombreApellido') && renderInput('Nombre y Apellido', 'nombreApellido', 'text', 'Juan Perez')}
            {isCampoHabilitado('nombreApellido') && renderInput('CUIT/L', 'cuit', 'text', '20315869567')}
            {isCampoHabilitado('descripcion') && renderArea('Descripcion', 'descripcion')}
            {isCampoHabilitado('moneda') && renderSelect('Moneda', 'moneda', monedas)}
            {isCampoHabilitado('valor') && renderInput('Valor en moneda original', 'valor', 'number', '0')}
            {isCampoHabilitado('marca') && renderInput('Marca', 'marca', 'text', '')}
            {isCampoHabilitado('modelo') && renderInput('Modelo', 'modelo', 'text', '')}
            {isCampoHabilitado('numeroSerie') && renderInput('Numero de serie', 'numeroSerie', 'text', '')}
            {isCampoHabilitado('calle') && renderInput('Calle', 'calle', 'text', '')}
            {isCampoHabilitado('numero') && renderInput('Numero', 'numero', 'text', '')}
            {isCampoHabilitado('piso') && renderInput('Piso', 'piso', 'text', '')}
            {isCampoHabilitado('depto') && renderInput('Depto', 'depto', 'text', '')}
            {isCampoHabilitado('localidad') && renderInput('Localidad', 'localidad', 'text', '')}
            {isCampoHabilitado('partido') && renderInput('Partido', 'partido', 'text', '')}
            {isCampoHabilitado('provincia') && renderInput('Provincia', 'provincia', 'text', '')}
            {isCampoHabilitado('cp') && renderInput('Codigo Postal', 'cp', 'text', '')}
            {isCampoHabilitado('fuente') && renderSelect('Fuente', 'fuente', fuentes)}

            <button type='submit'>Agregar registro</button>
        </form>
        </>
    )

}

export{TipoContragarantia}


