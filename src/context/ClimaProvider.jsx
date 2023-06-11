import axios from 'axios'
import React, { createContext, useState } from 'react'

const ClimaContext = createContext()
function ClimaProvider({children}) {

    const API_KEY = import.meta.env.VITE_API_KEY

    const [ busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const [ resultado, setResultado ] = useState({})
    const [ noResultado, setNoResultado ] = useState(false)
    const [ cargando, setCargando ] = useState(false)

    const updateDatosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const consultarClima = async datos => {
        setCargando(true)
        setNoResultado(false)
        setResultado({})
        try {
            const {ciudad, pais}  = datos

            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${API_KEY}`

            const { data } = await axios(url)
            const {lat, lon} = data[0]
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

            const { data: clima } = await axios(urlClima)
            
            setResultado(clima)
            
        } catch (error) {
            setNoResultado('No hay resultados')
        } finally {
            setCargando(false)
        }
        
    }

    return (
        <ClimaContext.Provider 
            value={{
                busqueda,
                updateDatosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado
            }}>
            {children}
        </ClimaContext.Provider>
    )
}

export default ClimaProvider

export {
    ClimaContext
}