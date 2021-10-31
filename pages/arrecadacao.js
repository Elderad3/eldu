import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function Arrecadacao({ arrecadacaoAnualHistorico, arrecadacaoAnualUltimosDezAnos, arrecadacaoMensalUltimosDozeMeses }) {
  return (
    <Layout>
      <Head>
        <title>Arrecadação</title>
        <meta name="description" content="Dados consolidados da Arrecadação das Receita Federais - Receita Bruta, evolução"></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Arrecadação das Receita Federais - Receita Bruta</h1>
          </div>
        </div>
        <div className="mt-4">
          <hr></hr>
          <h4 className="mt-2 text-sm font-bold uppercase">Últimos 10 anos - Consolidado Anual</h4>
        </div>
        <div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={arrecadacaoAnualUltimosDezAnos.map(item => item.ano)}
                  valores={arrecadacaoAnualUltimosDezAnos.map(item => Math.round(item.total*1000000))} titulo={"Arrecadação (R$)"} />
              </div>
            </div >
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-5">
              {arrecadacaoAnualUltimosDezAnos.map(item => (
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
                    <CurrencyDollarIcon className="h-6 w-6 text-azul mr-2" />
                    <h1 className="font-bold">{transformarBR(item.total*1000000)}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <hr className="bg-azul"></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">Últimos 12 Meses - Consolidado Mensal</h4>
          </div>
          <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="grid mt-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {arrecadacaoMensalUltimosDozeMeses.map(item => (
                <div key={item.VALDATA} className="p-4 bg-white  rounded shadow">
                  <div>
                    <span className="text-xs font-semibold text-gray-400">{transformarMes(new Date(item.VALDATA).getMonth() + 1)}/{new Date(item.VALDATA).getFullYear()}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-azul mr-2" />
                    <h1 className="text-xs font-bold">{transformarBR(item.VALVALOR*1000000)}</h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid mt-2 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <div className="bg-white p-6 rounded shadow">
                <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
                <BarChartComponent labels={arrecadacaoMensalUltimosDozeMeses.map(item => new Date(item.VALDATA).getMonth() + 1 + "/" + new Date(item.VALDATA).getFullYear())}
                  valores={arrecadacaoMensalUltimosDozeMeses.map(item => Math.round(item.VALVALOR*1000000))} titulo={"Arrecadacao (R$)"} />
              </div>
            </div >
          </div>
          <div className="mt-6">
            <hr></hr>
            <h4 className="mt-2 text-sm font-bold uppercase">Dados Históricos - Consolidado Anual</h4>
          </div>
          <div className="grid mt-2 gap-2 md:grid-cols-1 lg:grid-cols-1">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
              <LineChartComponent labels={arrecadacaoAnualHistorico.map(item => item.ano)} valores={arrecadacaoAnualHistorico.map(item => Math.round(item.total*1000000))} titulo={"Arrecadacao Anual (R$)"} />
              <div className="grid gap-2 mt-4 md:grid-cols-3 lg:grid-cols-5">
                {arrecadacaoAnualHistorico.map(item => (
                  <div key={item.ano} className="p-1 bg-white text-center rounded shadow">
                    <div>
                      <span className="text-sm font-bold text-gray-400"> {item.ano}:</span>
                      <span className="text-sm font-bold text-black"> {transformarBR(item.total*1000000)}</span>
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
  const arrecadacao = await fetch(`${server}/api/arrecadacao`)
  const arrecadacaoMensalTotal = await arrecadacao.json()
  const filtroArrecadacaoAnualUltimosDezAnos = await arrecadacaoMensalTotal.value.filter(item => new Date(item.VALDATA).getFullYear() > new Date().getFullYear() - 10)
  const arrecadacaoAnualUltimosDezAnos = calcularArrecadacaoPorAno(filtroArrecadacaoAnualUltimosDezAnos)
  const arrecadacaoMensalUltimosDozeMeses = arrecadacaoMensalTotal.value.filter(item => arrecadacaoMensalTotal.value.indexOf(item) > arrecadacaoMensalTotal.value.length - 13)
  const arrecadacaoAnualHistorico = calcularArrecadacaoPorAno(arrecadacaoMensalTotal.value)
  return {
    props: { arrecadacaoAnualHistorico, arrecadacaoAnualUltimosDezAnos, arrecadacaoMensalUltimosDozeMeses }
  }
}

function calcularArrecadacaoPorAno(arrecadacaoMensal) {
  const separadoPorAno = []
  const lista = arrecadacaoMensal.map(item => {
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
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 ,  style: 'currency', currency: 'BRL'})
}
export default Arrecadacao
