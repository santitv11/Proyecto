const API = 'https://api.covid19api.com/summary'
const API2 = 'https://restcountries.eu/rest/v2/all'

const fetchData = async(URL) => {
    try {
        const response = await fetch(URL, {})
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const mostrarDatos = (datos, banderas) => {
    const contenido = document.getElementById('contenedor')
    let flag
    datos.map((dato) => {
        banderas.map((bandera) => {
            if (dato.CountryCode == bandera.alpha2Code) {
                flag = bandera.flag
            }
        })
        contenido.innerHTML = contenido.innerHTML + `
        <div class="col mb-4">
            <div class="card shadow p-3 rounded-lg">
                <img style="background-image: url(${flag});" class="card-img-top rounded-lg personal border">
                <div class="card-body">
                    <h5 class="card-title">${dato.Country} (${dato.CountryCode})</h5>
                    <p class="card-text small mb-0">Nuevos Casos: ${dato.NewConfirmed}</p>
                    <p class="card-text small mb-0">Total Casos: ${dato.TotalConfirmed}</p>
                    <p class="card-text small mb-0">Nuevas muertes: ${dato.NewDeaths}</p>
                    <p class="card-text small mb-0">Total muertos: ${dato.TotalDeaths}</p>
                    <p class="card-text small mb-0">Nuevos recuperados: ${dato.NewRecovered}</p>
                    <p class="card-text small mb-0">Total recuperados: ${dato.TotalRecovered}</p>
                </div>
                <div class="card-footer border">
                    <small class="text-muted">Actualido: ${dato.Date}</small>
                </div>
            </div>
        </div>`
    })
}

const funcionInicial = async() => {
    let datos = await fetchData(API)
    let banderas = await fetchData(API2)
    mostrarDatos(datos.Countries, banderas)
}

funcionInicial()

function validar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) funcionBuscar();
}

const funcionBuscar = async() => {
    let datos = await fetchData(API)
    let banderas = await fetchData(API2)
    buscarDatos(datos.Countries, banderas)
}

const buscarDatos = (datos, banderas) => {
    const contenido = document.getElementById('buscar')
    const nombreBuscar = document.getElementById('input').value
    let flag
    let encontro = 0
    datos.map((dato) => {
        if (String(dato.Country.toLowerCase()) == String(nombreBuscar.toLowerCase()) || String(dato.CountryCode.toLowerCase()) == String(nombreBuscar.toLowerCase())) {
            encontro = 1
            banderas.map((bandera) => {
                if (dato.CountryCode == bandera.alpha2Code) {
                    flag = bandera.flag
                }
            })
            contenido.innerHTML = `
            <div class="row">
                <div class="col-sm-11">
                    <div class="card shadow rounded-lg" style="background-color: rgba(94,75,121,0.44);">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h6 class="card-title">${dato.Country} (${dato.CountryCode})</h6>
                                    <p class="card-text small mb-0">Nuevos Casos: ${dato.NewConfirmed} - Total Casos: ${dato.TotalConfirmed}</p>
                                    <p class="card-text small mb-0">Nuevas muertes: ${dato.NewDeaths} - Total muertos: ${dato.TotalDeaths}</p>
                                    <p class="card-text small mb-0">Nuevos recuperados: ${dato.NewRecovered}</p>
                                    <p class="card-text small mb-0">Total recuperados: ${dato.TotalRecovered}</p>
                                </div>
                                <div class="col-sm-6 text-center">
                                <img style="background-image: url(${flag});" class="rounded-lg personalbuscar border">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    })
    if (encontro == 0 && nombreBuscar != "") {
        alert('No se han encontrado resultados, recuerda que el nombre debe estar escrito en ingles')
    }
}