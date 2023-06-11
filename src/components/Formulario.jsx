import React, { useState } from 'react'
import useClima from '../hooks/useClima'

const Formulario = () => {

    const [ alerta, setAlerta ] = useState('')
    const { busqueda, updateDatosBusqueda, consultarClima } = useClima()
    const { ciudad, pais } = busqueda
    const handleSubmit = e => {
        e.preventDefault()
        if (Object.values(busqueda).includes('')){
            setAlerta("Todos los campos son obligatorios")
            return
        }
        setAlerta('')
        consultarClima(busqueda)
    }
    return (
        <div className='contenedor'>
            {alerta && <p>{alerta}</p>}
            <form 
                onSubmit={handleSubmit}
            >
                <div className='campo'>
                    <label htmlFor='ciudad'>Ciudad</label>
                    <input type='text'
                        id='ciudad'
                        name='ciudad'
                        onChange={updateDatosBusqueda} />
                </div>
                <div className='campo'>
                    <label htmlFor='pais'>País</label>
                    <select id='pais' name='pais'
                        onChange={updateDatosBusqueda}
                    >
                        <option value="">-- Seleccione un país --</option>
                        <option value="ES">España</option>
                        <option value="US">Estados Unidos</option>
                        <option value="CN">China</option>
                        <option value="GB">Reino Unido</option>
                    </select>
                </div>
                <input type='submit' value='Consultar clima'
                />
            </form>
        </div>
    )
}

export default Formulario