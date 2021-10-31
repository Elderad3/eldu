import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import { CashIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function Igpm({ igpmAnualHistorico, igpmAnualUltimosDezAnos, igpmMensalUltimosDozeMeses }) {
  return (
    <Layout>
      <Head>
        <title>IGPM</title>
        <meta name="description" content="Dados consolidados do IGPM, evolução do IGPM"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">IGPM</h1>
          </div>
        </div>
        <div className="mt-4">
          <hr></hr>
          <h4 className="mt-2 text-sm font-bold uppercase">IGPM Últimos 10 anos - Consolidado Anual</h4>
        </div>
        <div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={igpmAnualUltimosDezAnos.map(item => item.ano)}
                  valores={igpmAnualUltimosDezAnos.map(item => item.total)} titulo={"IGPM (%)"} />
              </div>
            </div >
            <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {igpmAnualUltimosDezAnos.map(item => (
                <div key={item.ano} className="p-6 bg-white rounded shadow">
                  <div>
                    <span className="text-sm font-semibold text-gray-400">{item.ano}</span>
                    {item.ano === new Date().getFullYear().toString()
                      ?
                      <span className="text-xs text-gray-400"> Até {transformarMes(new Date().getMonth() + 1)}</span>
                      :
                      <span className="text-xs text-gray-400"> Anual</span>
                    }
                  </div>
                  <div className="flex justify-start items-center">
                    <CashIcon className="h-6 w-6 text-azul mr-2" />
                    <h1 className="font-bold">{transformarBR(item.total)}%</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <hr className="bg-azul"></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">IGPM Últimos 12 Meses - Consolidado Mensal</h4>
          </div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {igpmMensalUltimosDozeMeses.map(item => (
                <div key={item.VALDATA} className="p-4 bg-white  rounded shadow">
                  <div>
                    <span className="text-xs font-semibold text-gray-400">{transformarMes(new Date(item.VALDATA).getMonth() + 1)}/{new Date(item.VALDATA).getFullYear()}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <CashIcon className="h-6 w-6 text-azul mr-2" />
                    <h1 className="text-xs font-bold">{transformarBR(item.VALVALOR)}%</h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={igpmMensalUltimosDozeMeses.map(item => new Date(item.VALDATA).getMonth() + 1 + "/" + new Date(item.VALDATA).getFullYear())}
                  valores={igpmMensalUltimosDozeMeses.map(item => item.VALVALOR)} titulo={"IGPM (%)"} />
              </div>
            </div >
          </div>
          <div className="mt-6">
            <hr></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">IGPM Dados Históricos - Consolidado Anual</h4>
          </div>
          <div className="grid mt-2 gap-2 md:grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
              <LineChartComponent labels={igpmAnualHistorico.map(item => item.ano)} valores={igpmAnualHistorico.map(item => item.total)} titulo={"IGPM Anual (%)"} />
              <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
                {igpmAnualHistorico.map(item => (
                  <div key={item.ano} className="p-1 bg-white text-center rounded shadow">
                    <div>
                      <span className="text-sm font-bold text-gray-400"> {item.ano}:</span>
                      <span className="text-sm font-bold text-black"> {transformarBR(item.total)}%</span>
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
  const igpm = await fetch(`${server}/api/igpm`)
  const igpmMensalTotal = await igpm.json()
  const igpmAnual = await fetch(`${server}/api/igpm-anual`)
  const igpmAnualTotal = await igpmAnual.json()

  const filtroIgpmAnualUltimosDezAnos = await igpmAnualTotal.value.filter(item => new Date(item.VALDATA).getFullYear() > new Date().getFullYear() - 11)
  const igpmAnualUltimosDezAnos = calcularIgpmPorAno(filtroIgpmAnualUltimosDezAnos)
  const igpmMensalUltimosDozeMeses = igpmMensalTotal.value.filter(item => igpmMensalTotal.value.indexOf(item) > igpmMensalTotal.value.length - 13)
  const igpmAnualHistorico = calcularIgpmPorAno(igpmAnualTotal.value)
  return {
    props: { igpmAnualHistorico, igpmAnualUltimosDezAnos, igpmMensalUltimosDozeMeses }
  }
}

function calcularIgpmPorAno(igpmMensal) {
  const separadoPorAno = []
  const lista = igpmMensal.map(item => {
    return {
      VALDATA: item.VALDATA,
      ANO: new Date(item.VALDATA).getFullYear(),
      VALVALOR: item.VALVALOR
    }
  }
  )
  const listaAgrupadaPorAno = agrupar(lista, 'ANO')
  for (let ano in listaAgrupadaPorAno) {
    let total = listaAgrupadaPorAno[ano].reduce(function (a, b) { return a + b["VALVALOR"]; }, 0);
    separadoPorAno.push({ ano, total });
  }
  return separadoPorAno
}

function agrupar(lista, propriedade) {
  return lista.reduce(function (total, obj) {
    let chave = obj[propriedade];
    if (!total[chave]) {
      total[chave] = [];
    }
    total[chave].push(obj);
    return total;
  }, {});
};

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

function transformarBR(number) {
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}
export default Igpm
