import React, { useEffect, useState } from 'react';
import './TipoContragarantia.css'


const monedas = ['Dólares', 'Pesos', 'Euros'];
const fuentes = ['Cotizacion', 'DDJJ BBPP', 'EECC', 'Factura final', 'Factura proforma', 'Tasación', 'Póliza de seguro', 'MMBB'];

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
        e.preventDefault()
        onAgregar(form)
        setForm({})
    }

    if (!tipo) return null

    useEffect(() => {
      console.log("Tipo seleccionado:", tipo);
      console.log("Campos habilitados:", camposHabilitadosPorTipo[tipo]);
      console.log("Campos requeridos:", camposRequeridosPorTipo[tipo]);
    }, [tipo]);

    const renderInput = (label, name, type, placeholder, required)=>{ 
        return(
            <label htmlFor={name}> {label}
                <input 
                type={type} 
                name={name}
                value={form[name] || ''}
                placeholder={placeholder}
                onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)}
                required={required}
                disabled={!isCampoHabilitado(name)}
                />
            </label>
        )
    }

    const renderArea = (label, name, required) => {
        return(
            <label htmlFor={name}>{label}
                <textarea name={name} onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)} required={required} disabled={!isCampoHabilitado(name)}>
                </textarea>
            </label>
        )
    }

    const renderSelect = (label, name, options, required)=>{ 
        return(
            <label htmlFor={name}>{label}
                <select name={name} value={form[name] || ''} onChange={(e)=>handleChangeTwo(e.target.name, e.target.value)} required={required} disabled={!isCampoHabilitado(name)} >
                <option value="" disabled hidden>Elija una opcion</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </label>
        )
    }


    return(
        <>
            <div>
                <div className='grupoCliente'>
                    {isCampoHabilitado('nombreApellido') && renderInput('Nombre y Apellido', 'nombreApellido', 'text', 'Juan Perez', isCampoRequerido('nombreApellido'))}
                    {isCampoHabilitado('cuit') && renderInput('CUIT/L', 'cuit', 'text', '20315869567',isCampoRequerido('cuit'))}
                </div>
                {isCampoHabilitado('descripcion') && renderArea('Descripcion', 'descripcion',isCampoRequerido('descripcion'))}
                <div className='grupoValor'>
                    {isCampoHabilitado('moneda') && renderSelect('Moneda', 'moneda', monedas, isCampoRequerido('moneda'))}
                    {isCampoHabilitado('valor') && renderInput('Valor en moneda original', 'valor', 'number', '0',isCampoRequerido('valor'))}
                    {isCampoHabilitado('fuente') && renderSelect('Fuente', 'fuente', fuentes, isCampoRequerido('fuente'))}
                </div>
                <div className='grupoBien'>
                    {isCampoHabilitado('marca') && renderInput('Marca', 'marca', 'text', '',isCampoRequerido('marca'))}
                    {isCampoHabilitado('modelo') && renderInput('Modelo', 'modelo', 'text', '',isCampoRequerido('modelo'))}
                    {isCampoHabilitado('numeroSerie') && renderInput('Numero de serie', 'numeroSerie', 'text', '', isCampoRequerido('numeroSerie'))}
                </div>
                <div>
                    {isCampoHabilitado('calle') && <h3>Domicilio</h3>}
                    <div className='grupoDomicilio'>
                    {isCampoHabilitado('calle') && renderInput('Calle', 'calle', 'text', '', isCampoRequerido('calle'))}
                    {isCampoHabilitado('numero') && renderInput('Numero', 'numero', 'text', '', isCampoRequerido('numero'))}
                    {isCampoHabilitado('piso') && renderInput('Piso', 'piso', 'text', '', isCampoRequerido('piso'))}
                    {isCampoHabilitado('depto') && renderInput('Depto', 'depto', 'text', '', isCampoRequerido('depto'))}
                    {isCampoHabilitado('localidad') && renderInput('Localidad', 'localidad', 'text', '', isCampoRequerido('localidad'))}
                    {isCampoHabilitado('partido') && renderInput('Partido', 'partido', 'text', '', isCampoRequerido('partido'))}
                    {isCampoHabilitado('provincia') && renderInput('Provincia', 'provincia', 'text', '', isCampoRequerido('provincia'))}
                    {isCampoHabilitado('cp') && renderInput('Codigo Postal', 'cp', 'text', '', isCampoRequerido('cp'))}
                    </div>
                </div>
                <button className='btnAgregar' type='button' onClick={agregar}>Agregar registro</button>
            </div>
        </>
    )

}

export{TipoContragarantia}


