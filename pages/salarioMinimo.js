import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function SalarioMinimo({json, data}) {

  return (
    <Layout>
    <Head>
      <title>Salário Mínimo No Brasil</title>
      <meta name="description" content="Evolução do Salário Mínimo no Brasil desde a Criação do Plano real. Dados consolidados e estimativas."></meta>
    </Head>
    <div className="container">
      <div className="flex justify-between">
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-indigo-900">Salário Mínimo no Brasil</h1>
          <h4 className="text-sm font-semi-bold text-indigo-600">Dados consolidados e estimativas para o salário mínimo no Brasil</h4>
        </div>
        <div>
        </div>
      </div>
      <div>
        <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="p-6 bg-white  rounded-xl shadow-lg">
            <div>
              <span className="text-sm font-semibold text-gray-400">2030</span>
              <span className="text-xs text-gray-400"> (Estimativa)(a)</span>
            </div>
            <div className="flex justify-start items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold">R$ {data.projecaoDezAnos}</h1>
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div>
              <span className="text-sm font-semibold text-gray-400">2040</span>
              <span className="text-xs text-gray-400"> (Estimativa)(a)</span>
            </div>
            <div className="flex justify-start items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold">R$ {data.projecaoVinteAnos}</h3>
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div>
              <span className="text-sm font-semibold text-gray-400">2050</span>
              <span className="text-xs text-gray-400"> (Estimativa)(a)</span>
            </div>
            <div className="flex justify-start items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold">R$ {data.projecaoTrintaAnos}</h3>
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div>
              <span className="text-sm font-semibold text-gray-400">2060</span>
              <span className="text-xs text-gray-400"> (Estimativa)(a)</span>
            </div>
            <div className="flex justify-start items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold">R$ {data.projecaoQuarentaAnos}</h3>
            </div>
          </div>  <div className="p-6 bg-white rounded-xl shadow-lg">
            <div>
              <span className="text-sm font-semibold text-gray-400">2070</span>
              <span className="text-xs text-gray-400"> (Estimativa)(a)</span>
            </div>
            <div className="flex justify-start items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold">R$ {data.projecaoCinquentaAnos}</h3>
            </div>
          </div>
        </div>
        <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold">Evolução do Salário Mínimo no Brasil</h3>
            <p className="text-xs text-gray-400">Fonte: Ministério do Trabalho e Emprego.</p>
            <LineChartComponent labels={json.data.map(item => item.Ano)} valores={json.data.map(item => item.valor)} titulo={"Salário Mínimo"} />
          </div>
        </div>
      </div>
      <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
        {json.data.map(item => (
          <div  key={item.Ano} className="p-1 bg-white text-center rounded shadow">
            <div>
              <span className="text-sm font-bold text-gray-400"> {item.Ano}:</span>
              <span className="text-sm font-bold text-black"> R$: {transformarBR(item.valor)}</span>
            </div>
          </div>
        ))
        }
      </div>
      <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-xs text-gray-400">(a): Representa apenas uma estimativa calculada por algorítimos deste próprio site com base em dados existentes do salário Mínimo</p>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export async function getServerSideProps() {
  const data = {
    projecaoDezAnos: transformarBR(1848),
    projecaoVinteAnos: transformarBR(3270),
    projecaoTrintaAnos: transformarBR(5784),
    projecaoQuarentaAnos: transformarBR(10233),
    projecaoCinquentaAnos: transformarBR(18103)
  }
  const result = await fetch(`${server}/api/salarioMinimo`)
  const json = await result.json()
  return {
    props: {json, data}
  }
}

function transformarBR(number){
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}


export default SalarioMinimo
