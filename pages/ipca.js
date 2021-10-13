import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import {CashIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function Ipca({ ipcaAnualHistorico, ipcaAnualUltimosDezAnos, ipcaMensalUltimosDozeMeses }) {
  return (
    <Layout>
      <Head>
        <title>IPCA</title>
        <meta name="description" content="Dados consolidados do IPCA, IPCA Acumulado 2021, IPCA 2021 hoje"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">IPCA</h1>
          </div>
        </div>
        <div className="mt-4">
          <hr></hr>
          <h4 className="mt-2 text-sm font-bold uppercase">IPCA Últimos 10 anos - Consolidado Anual</h4>
        </div>
        <div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={ipcaAnualUltimosDezAnos.map(item => item.ano)}
                  valores={ipcaAnualUltimosDezAnos.map(item => item.total)} titulo={"IPCA (%)"} />
              </div>
            </div >
            <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {ipcaAnualUltimosDezAnos.map(item => (
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
            <hr></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">IPCA Últimos 12 Meses - Consolidado Mensal</h4>
          </div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {ipcaMensalUltimosDozeMeses.map(item => (
                <div key={item.VALDATA} className="p-4 bg-white  rounded shadow">
                  <div>
                    <span className="text-xs font-semibold text-gray-400">{transformarMes(new Date(item.VALDATA).getMonth() + 1)}/{new Date(item.VALDATA).getFullYear()}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <CashIcon className="h-6 w-6 text-azul mr-2" />
                    <h1 className="text-xs font-bold">{item.VALVALOR}%</h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={ipcaMensalUltimosDozeMeses.map(item => new Date(item.VALDATA).getMonth() + 1 + "/" + new Date(item.VALDATA).getFullYear())}
                  valores={ipcaMensalUltimosDozeMeses.map(item => item.VALVALOR)} titulo={"IPCA (%)"} />
              </div>
            </div >
          </div>
          <div className="mt-6">
            <hr></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">IPCA Dados Históricos - Consolidado Anual</h4>
          </div>
          <div className="grid mt-2 gap-2 md:grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
              <LineChartComponent labels={ipcaAnualHistorico.map(item => item.ano)} valores={ipcaAnualHistorico.map(item => item.total)} titulo={"IPCA Anual (%)"} />
              <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
                {ipcaAnualHistorico.map(item => (
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
  const ipca = await fetch(`${server}/api/ipca`)
  const ipcaMensalTotal = await ipca.json()
  const filtroIpcaAnualUltimosDezAnos = await ipcaMensalTotal.value.filter(item => new Date(item.VALDATA).getFullYear() > new Date().getFullYear()-10)
  const ipcaAnualUltimosDezAnos = calcularIpcaPorAno(filtroIpcaAnualUltimosDezAnos)
  const ipcaMensalUltimosDozeMeses = ipcaMensalTotal.value.filter(item => ipcaMensalTotal.value.indexOf(item) > ipcaMensalTotal.value.length - 13)
  const ipcaAnualHistorico = calcularIpcaPorAno(ipcaMensalTotal.value)
  return {
    props: { ipcaAnualHistorico, ipcaAnualUltimosDezAnos, ipcaMensalUltimosDozeMeses }
  }
}

function calcularIpcaPorAno(ipcaMensal){
  const separadoPorAno = []
  const lista = ipcaMensal.map(item => { 
    return {
    VALDATA: item.VALDATA,
    ANO: new Date(item.VALDATA).getFullYear(),
    VALVALOR: item.VALVALOR
    }
}
)
const listaAgrupadaPorAno = agrupar(lista, 'ANO')
for (let ano in listaAgrupadaPorAno) {
  let total = listaAgrupadaPorAno[ano].reduce(function (a, b) {return a + b["VALVALOR"];}, 0);
  separadoPorAno.push({ano, total});
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

function transformarBR(number){
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}
export default Ipca
