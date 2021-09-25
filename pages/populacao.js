import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import { UserGroupIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function Populacao({ data, json }) {
  return (
    <Layout>
      <Head>
        <title>Evolução da População Brasileira desde 1550</title>
        <meta name="description" content="Dados consolidados da evolução e estimativas da população Brasileira"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-indigo-900">População do Brasil</h1>
            <h4 className="text-sm font-semi-bold text-indigo-600">Dados consolidados da População Brasileira</h4>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div className="grid mt-4 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <div className="p-6 bg-white  rounded-xl shadow-lg">
              <div>
                <span className="text-sm font-semibold text-gray-400">População Atual</span>
                <span className="text-xs text-gray-400"> (Estimada)(a)</span>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h1 className="text-xl font-bold">{data.populacao}</h1>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div>
                <span className="text-sm font-semibold text-gray-400">Nascimentos este ano</span>
                <span className="text-xs text-gray-400"> (Estimativa até o momento)(b)</span>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.nascimentosAno}</h3>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div>
                <span className="text-sm font-semibold text-gray-400">Nascimentos hoje</span>
                <span className="text-xs text-gray-400"> (Estimativa até o momento)(b)</span>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.nascimentosHoje}</h3>
              </div>
            </div>
          </div>

          <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white  rounded-xl shadow-lg">
              <div>
                <span className="text-sm font-semibold text-gray-400">Óbitos este ano</span>
                <span className="text-xs text-gray-400"> (Estimativa até o momento)(b)</span>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.obitosAno}</h3>
              </div>
            </div>
            <div className="p-6 bg-white  rounded-xl shadow-lg">
              <div>
                <span className="text-sm font-semibold text-gray-400">Óbitos hoje</span>
                <span className="text-xs text-gray-400"> (Estimativa até o momento)(b)</span>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.obitosHoje}</h3>
              </div>
            </div>
            <div className="p-6 bg-white  rounded-xl shadow-lg">
              <div>
                <p className="text-sm font-semibold text-gray-400">Crescimento populacional este ano</p>
                <p className="text-xs text-gray-400"> (Estimativa até o momento)(b)</p>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.crescimentoAno}</h3>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div>
                <p className="text-sm font-semibold text-gray-400">Crescimento populacional hoje</p>
                <p className="text-xs text-gray-400"> (Estimativa até o momento)(b)</p>
              </div>
              <div className="flex justify-start items-center">
                <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-xl font-bold">{data.crescimentoHoje}</h3>
              </div>
            </div>
          </div>
          <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold">Evolução da população Brasileira</h3>
              <p className="text-xs text-gray-400">Fonte: IBGE Instituto Brasileiro de Geografia estatística.</p>
              <LineChartComponent labels={json.data.map(item => item.ano)} valores={json.data.map(item => item.quantidade)} titulo={"População Brasileira"} />
            </div>
          </div>
        </div>
        <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
          {json.data.map(item => (
            <div key={item.ano} className="p-1 bg-white text-center rounded shadow">
              <div>
                <span className="text-sm font-bold text-gray-400"> {item.ano}:</span>
                <span className="text-sm font-bold text-black"> {item.quantidade.toLocaleString('pt-br', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          ))
          }
        </div>
        <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-xs text-gray-400">(a): Representa apenas uma estimativa calculada por algorítimos deste próprio site levando em consideração números populacionais já existentes registrados pelo IBGE.</p>
            <p className="text-xs text-gray-400">(b): Representa apenas uma estimativa calculada por algorítimos deste próprio site levando em consideração números anuais já registrados pelo portal da transparência de registro civil transparencia.registrocivil.org.br.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = {
    populacao: transformarBR(calcularPopulacao()),
    nascimentosAno: transformarBR(calcularNascimentosAno()),
    nascimentosHoje: transformarBR(calcularNascimentosHoje()),
    obitosAno: transformarBR(calcularObitosAno()),
    obitosHoje: transformarBR(calcularObitosHoje()),
    crescimentoAno: transformarBR(calcularCrescimentoAno()),
    crescimentoHoje: transformarBR(calcularCrescimentoHoje())
  }
  const result = await fetch(`${server}/api/populacao`)
  const json = await result.json()
  return {
    props: { data, json }
  }
}



function calcularPopulacao() {
  let dataReferencia = new Date("2021-09-04 18:41:00")
  let milisegundosPopulacao = 21000
  let diferenca = new Date() - dataReferencia
  return 213553924 + (diferenca / milisegundosPopulacao)
}

function calcularNascimentosAno() {
  let anoReferencia = new Date().getFullYear() - 1
  let dataReferencia = new Date(`${anoReferencia}-12-31 00:00:00`)
  let milisegundosNascimentos = 11994
  let diferenca2 = new Date() - dataReferencia
  return (diferenca2 / milisegundosNascimentos)
}

function calcularNascimentosHoje() {
  let anoReferencia = new Date().getFullYear()
  let mesReferencia = new Date().getMonth() + 1
  let diaReferencia = new Date().getDate()
  let dataReferencia = new Date(`${anoReferencia}-${mesReferencia}-${diaReferencia} 00:00:00`)
  let milisegundosNascimentos = 11994
  let diferenca2 = new Date() - dataReferencia
  return (diferenca2 / milisegundosNascimentos)
}

function calcularObitosAno() {
  let anoReferencia = new Date().getFullYear() - 1
  let dataReferencia = new Date(`${anoReferencia}-12-31 00:00:00`)
  let milisegundosNascimentos = 21535.39
  let diferenca2 = new Date() - dataReferencia
  return (diferenca2 / milisegundosNascimentos)
}

function calcularObitosHoje() {
  let anoReferencia = new Date().getFullYear()
  let mesReferencia = new Date().getMonth() + 1
  let diaReferencia = new Date().getDate()
  let dataReferencia = new Date(`${anoReferencia}-${mesReferencia}-${diaReferencia} 00:00:00`)
  let milisegundosNascimentos = 21535.39
  let diferenca2 = new Date() - dataReferencia
  return (diferenca2 / milisegundosNascimentos)
}

function calcularCrescimentoAno() {
  return calcularNascimentosAno() - calcularObitosAno()
}

function calcularCrescimentoHoje() {
  return calcularNascimentosHoje() - calcularObitosHoje()
}

function transformarBR(number){
  return number.toLocaleString('pt-br', { maximumFractionDigits: 0 })
}


export default Populacao
