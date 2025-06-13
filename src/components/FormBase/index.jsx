import React, {useState} from 'react';
import './FormBase.css'
import { TipoSociedad } from '../TipoSociedad';
import { TipoContragarantia } from '../TipoContragarantia';
import { FaArrowRight } from "react-icons/fa"

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

const FormBase = () => {

    const [etapa, setEtapa] = useState(1)

    const [formData, setFormData] = useState ({
        nombre:'',
        cuit:'',
        personeria:'',
        tipoSociedad:'',
        tipoOp:'',
        nombreCot:'',
        cuitCot:'',
        personeriaCot:'',
        tipoSociedadCot:'',
    })

    const handleChange = (field, value)=>{ 
        setFormData ({...formData, [field]:value})
    }

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

    const handleEtapa = (e)=>{
        
        const camposRequeridos = ['nombre', 'cuit', 'personeria']

        if (formData.personeria === 'pj'){
            camposRequeridos.push('tipoSociedad')
        }

        if (formData.tipoOp ==='coTitular' || formData.tipoOp ==='solidaria'){
            camposRequeridos.push('nombreCot', 'cuitCot', 'personeriaCot')
            if(formData.personeriaCot ==='pj'){
                camposRequeridos.push('tipoSociedadCot')
            }
        }

        for (const campo of camposRequeridos) {
            if (!formData[campo] || formData[campo].trim() === '') {
                alert(`Por favor, complete el campo: ${campo}`);
                return false;
            }
        }

        const inputs = document.querySelectorAll('.container-firmantes input[required], .container-firmantes select[required]')
            for (const input of inputs) {
                if (!input.value || input.value.trim() === '') {
                    alert('Por favor, complete todos los campos de los firmantes.');
                    return false;
                }
            }

        setEtapa(2)
        return true;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const datosFinales = {
            ...formData,
            cotizaciones,
            contragarantias: registros,
        }
    }

    return(
        <>
            {etapa===1 && (
                <div className='container'>
                    <form className='formulario'>
                        <h2 className='tituloDos'>Datos del cliente</h2>
                        <div className='grupoCampo'>
                            <label className='labelCliente' htmlFor="nombre">Razon Social</label>
                            <input 
                            className='campoCliente'
                            type="text"
                            name='nombre'
                            value={formData.nombre}
                            placeholder='Ingrese Nombre y Apellido o Razon Social' 
                            onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                            required
                            />
                        </div>
                        <div className='grupoCampo'>
                            <label className='labelCliente' htmlFor="cuit">CUIT</label>
                            <input 
                            className='campoCliente'
                            type="text"
                            name='cuit'
                            value={formData.cuit}
                            placeholder='Ingrese el CUIT/L' 
                            onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                            required
                            />
                        </div>
                        <div className='grupoCampo'>
                            <label className='labelCliente' htmlFor="personeria">Personería</label>
                            <select className='campoCliente' name="personeria" value={formData.personeria} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                <option value="" disabled hidden>Elija una opcion</option>
                                <option value="ph">Persona Humana</option>
                                <option value="pj">Persona Jurídica</option>
                            </select>
                        </div>
                        {formData.personeria === 'pj' && (
                            <div className='grupoCampo'>
                                <label className='labelCliente' htmlFor="tipoSociedad">Tipo Societario</label>
                                <select className='campoCliente' name="tipoSociedad" value={formData.tipoSociedad} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                    <option value="" disabled hidden>Elija una opcion</option>
                                    <option value="sa">S.A.</option>
                                    <option value="sas">S.A.S.</option>
                                    <option value="sau">S.A.U.</option>
                                    <option value="coop">Cooperativa</option>
                                    <option value="sh">S.H.</option>
                                    <option value="iv">Seccion IV</option>
                                    <option value="srl">S.R.L.</option>
                                </select>
                            </div>
                        )}
                        <TipoSociedad personeria={formData.personeria} tipoSociedad={formData.tipoSociedad} />
                        <hr />
                        <h2 className='tituloDos'>Datos del co-titular</h2>
                        <div className='grupoCampo'>
                            <label className='labelCliente' htmlFor="tipoOp">Posee Co-Titular o es Solidariamente?</label>
                                <select className='campoCliente' name="tipoOp" value={formData.tipoOp} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                    <option value="" disabled hidden>Elija una opcion</option>
                                    <option value="coTitular">Co-Titular</option>
                                    <option value="solidaria">Solidariamente</option>
                                    <option value="no">No</option>
                                </select>
                        </div>
                        {(formData.tipoOp === 'coTitular' || formData.tipoOp === 'solidaria')  && (
                            <>  
                                <div className='grupoCampo'>
                                    <label className='labelCliente' htmlFor="nombreCot">Razon Social</label>
                                    <input 
                                        className='campoCliente'
                                        type="text"
                                        name='nombreCot'
                                        value={formData.nombreCot}
                                        placeholder='Ingrese Nombre y Apellido o Razon Social' 
                                        onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className='grupoCampo'>
                                    <label className='labelCliente' htmlFor="cuitCot">CUIT</label>
                                    <input 
                                        className='campoCliente'
                                        type="text"
                                        name='cuitCot'
                                        value={formData.cuitCot}
                                        placeholder='Ingrese el CUIT/L' 
                                        onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className='grupoCampo'>
                                    <label className='labelCliente' htmlFor="personeriaCot">Personería</label>
                                    <select className='campoCliente' name="personeriaCot" value={formData.personeriaCot} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                        <option value="" disabled hidden>Elija una opcion</option>
                                        <option value="ph">Persona Humana</option>
                                        <option value="pj">Persona Jurídica</option>
                                    </select>
                                </div>
                                {formData.personeriaCot === 'pj' && (
                                    <div className='grupoCampo'>
                                        <label className='labelCliente' htmlFor="tipoSociedadCot">Tipo Societario</label>
                                        <select className='campoCliente' name="tipoSociedadCot" value={formData.tipoSociedadCot} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                            <option value="" disabled hidden>Elija una opcion</option>
                                            <option value="sa">S.A.</option>
                                            <option value="sas">S.A.S.</option>
                                            <option value="sau">S.A.U.</option>
                                            <option value="coop">Cooperativa</option>
                                            <option value="sh">S.H.</option>
                                            <option value="iv">Seccion IV</option>
                                            <option value="srl">S.R.L.</option>
                                        </select>
                                    </div>
                                )}
                                <TipoSociedad personeria={formData.personeriaCot} tipoSociedad={formData.tipoSociedadCot} />
                            </>
                        )}
                        <div className='containerEtapa'>
                            <button className='btnEtapa' type='button' onClick={handleEtapa}>Segunda Etapa <FaArrowRight /></button>
                        </div>
                    </form>
                </div>)
            }
            {etapa === 2 && (
                <form>
                    <div className='containerDos'>
                        <form className='formulario' onSubmit={handleSubmit}>
                            <div>
                                <h2 className='tituloDos'>Cargar cotización</h2>
                                <div className='grupoCotizacion'>
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
                            </div>
                            <hr />
                            <div className='grupoCampo'>
                            <label htmlFor="tipoContragarantia">Tipo de Contragarantia</label>  
                            <select name="tipoContragarantia" value={tipo} onChange={(e)=>setTipo(e.target.value)} required>
                                <option value="" disabled hidden>Elija una opcion</option>
                                {tipoContrag.map(t=>(<option key={t.value} value={t.value}>{t.label}</option>))}
                            </select>
                            </div>
                            {tipo!=="" && <TipoContragarantia tipo={tipo} onAgregar={handleAgregarRegistro}/>}
                        </form>
                    </div>
                    <div className='containerTres'>
                        <h2 className='tituloDos'>Registros cargados</h2>
                        <table border="1" cellPadding="5" borderColor='#838383'>
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
                    </div>
                    <div className='grupoBtn'>
                    <button className='btnEtapa' type='button' onClick={()=>setEtapa(1)}>Volver</button>
                    <button className='btnEtapa' type='submit'>Enviar datos</button>
                    </div>
                </form>
            )}
        </>
    )
}

export{FormBase}