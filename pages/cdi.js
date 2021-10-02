import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import { UserGroupIcon, CashIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function Cdi({ filtroCdiDozeMeses, filtroCdiAnual, cdiAnualJson }) {
  return (
    <Layout>
      <Head>
        <title>Evolução do CDI</title>
        <meta name="description" content="Dados consolidados do CDI, evolução do CDI"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">CDI</h1>
            <h4 className="text-sm font-semi-bold">Dados consolidados</h4>
          </div>
        </div>
        <div>
          <div className="grid mt-4 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {filtroCdiAnual.map(item => (
              <div key={item._id} className="p-6 bg-white  rounded-xl shadow-lg">
                <div>
                  <span className="text-sm font-semibold text-gray-400">{item.ano}</span>
                  {item.ano === new Date().getFullYear()
                    ?
                    <span className="text-xs text-gray-400"> Consolidado até {transformarMes(new Date().getMonth() + 1)}</span>
                    :
                    <span className="text-xs text-gray-400"> Consolidado Anual</span>
                  }
                </div>
                <div className="flex justify-start items-center">
                  <CashIcon className="h-6 w-6 text-azul mr-2" />
                  <h1 className="text-xl font-bold">{item.valor}%</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="grid mt-4 gap-4 md:grid-cols-6 lg:grid-cols-12">
            {filtroCdiDozeMeses.map(item => (
              <div key={item._id} className="p-4 bg-white  rounded-xl shadow-lg">
                <div>
                  <span className="text-xs font-semibold text-gray-400">{transformarMes(item.mes)}/{item.ano}</span>
                </div>
                <div className="flex justify-start items-center">
                  <CashIcon className="h-6 w-6 text-azul mr-2" />
                  <h1 className="text-xs font-bold">{item.valor}%</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold">CDI Anual Consolidado (%)</h3>
              <p className="text-xs text-gray-400">Fonte: B3</p>
              <LineChartComponent labels={cdiAnualJson.data.map(item => item.ano)} valores={cdiAnualJson.data.map(item => item.valor)} titulo={"CDI Anual"} />
              <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
                {cdiAnualJson.data.map(item => (
                  <div key={item._id} className="p-1 bg-white text-center rounded shadow">
                    <div>
                      <span className="text-sm font-bold text-gray-400"> {item.ano}:</span>
                      <span className="text-sm font-bold text-black"> {item.valor}%</span>
                    </div>
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const cdiAnual = await fetch(`${server}/api/cdiAnual`)
  const cdiAnualJson = await cdiAnual.json()
  const filtroCdiAnual = await cdiAnualJson.data.filter(item => item.ano > new Date().getFullYear() - 6)
  const cdiDozeMeses = await fetch(`${server}/api/cdiDozeMeses`)
  const cdiDozeMesesJson = await cdiDozeMeses.json()
  const filtroCdiDozeMeses = cdiDozeMesesJson.data.filter(item => cdiDozeMesesJson.data.indexOf(item) > cdiDozeMesesJson.data.length - 13)
  return {
    props: { filtroCdiDozeMeses, filtroCdiAnual, cdiAnualJson }
  }
}

function transformarMes(number) {
  let mes = ""
  number === 1 ? mes = "Janeiro" : undefined
  number === 2 ? mes = "Fevereiro" : undefined
  number === 3 ? mes = "Março" : undefined
  number === 4 ? mes = "Abril" : undefined
  number === 5 ? mes = "Maio" : undefined
  number === 6 ? mes = "Junho" : undefined
  number === 7 ? mes = "Julho" : undefined
  number === 8 ? mes = "Agosto" : undefined
  number === 9 ? mes = "Setembro" : undefined
  number === 10 ? mes = "Outubro" : undefined
  number === 11 ? mes = "Novembro" : undefined
  number === 12 ? mes = "Dezembro" : undefined
  return mes
}
export default Cdi
