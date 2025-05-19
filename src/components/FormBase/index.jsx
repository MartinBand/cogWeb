import React, {useState} from 'react';
import './FormBase.css'
import { TipoSociedad } from '../TipoSociedad';

const FormBase = () => {

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


    return(
        <div className='container'>
            <form className='formulario'>
                <h3 className='tituloDos'>Datos del cliente</h3>
                    <label htmlFor="nombre">Razon Social
                        <input 
                            type="text"
                            name='nombre'
                            value={formData.nombre}
                            placeholder='Ingrese Nombre y Apellido o Razon Social' 
                            onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                            required
                        />
                    </label>
                    <label htmlFor="cuit">CUIT
                        <input 
                            type="text"
                            name='cuit'
                            value={formData.cuit}
                            placeholder='Ingrese el CUIT/L' 
                            onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                            required
                        />
                    </label>
                    <label htmlFor="personeria">Personería
                        <select name="personeria" value={formData.personeria} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                            <option value="" disabled hidden>Elija una opcion</option>
                            <option value="ph">Persona Humana</option>
                            <option value="pj">Persona Jurídica</option>
                        </select>
                    </label>
                {formData.personeria === 'pj' && (
                        <label htmlFor="tipoSociedad">Tipo Societario
                        <select name="tipoSociedad" value={formData.tipoSociedad} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                            <option value="" disabled hidden>Elija una opcion</option>
                            <option value="sa">S.A.</option>
                            <option value="sas">S.A.S.</option>
                            <option value="sau">S.A.U.</option>
                            <option value="coop">Cooperativa</option>
                            <option value="sh">S.H.</option>
                            <option value="iv">Seccion IV</option>
                            <option value="srl">S.R.L.</option>
                        </select>
                        </label>
                )}
                <TipoSociedad personeria={formData.personeria} tipoSociedad={formData.tipoSociedad} />
                <h3 className='tituloDos'>Datos del co-titular</h3>
                    <label htmlFor="tipoOp">Posee Co-Titular o es Solidariamente?
                        <select name="tipoOp" value={formData.tipoOp} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                            <option value="" disabled hidden>Elija una opcion</option>
                            <option value="coTitular">Co-Titular</option>
                            <option value="solidaria">Solidariamente</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                {(formData.tipoOp === 'coTitular' || formData.tipoOp === 'solidaria')  && (
                    <>
                            <label htmlFor="nombreCot">Razon Social
                            <input 
                                type="text"
                                name='nombreCot'
                                value={formData.nombreCot}
                                placeholder='Ingrese Nombre y Apellido o Razon Social' 
                                onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                                required
                            />
                            </label>
                            <label htmlFor="cuitCot">CUIT
                            <input 
                                type="text"
                                name='cuitCot'
                                value={formData.cuitCot}
                                placeholder='Ingrese el CUIT/L' 
                                onChange={(e)=>{handleChange(e.target.name, e.target.value)}}
                                required
                            />
                            </label>
                            <label htmlFor="personeriaCot">Personería
                            <select name="personeriaCot" value={formData.personeriaCot} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                <option value="" disabled hidden>Elija una opcion</option>
                                <option value="ph">Persona Humana</option>
                                <option value="pj">Persona Jurídica</option>
                            </select>
                            </label>
                        {formData.personeriaCot === 'pj' && (
                                <label htmlFor="tipoSociedadCot">Tipo Societario
                                <select name="tipoSociedadCot" value={formData.tipoSociedadCot} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} required>
                                    <option value="" disabled hidden>Elija una opcion</option>
                                    <option value="sa">S.A.</option>
                                    <option value="sas">S.A.S.</option>
                                    <option value="sau">S.A.U.</option>
                                    <option value="coop">Cooperativa</option>
                                    <option value="sh">S.H.</option>
                                    <option value="iv">Seccion IV</option>
                                    <option value="srl">S.R.L.</option>
                                </select>
                                </label>
                        )}
                        <TipoSociedad personeria={formData.personeriaCot} tipoSociedad={formData.tipoSociedadCot} />
                    </>
                )}
                <button className='btn' type='submit'>Enviar Datos</button>
            </form>
        </div>
    )
}

export{FormBase}