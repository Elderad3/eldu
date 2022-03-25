import Head from 'next/head'
import Layout from '../components/Layout';
import LineChartComponent from '../components/LineChartComponent';
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { server } from '../config/index'

function SalarioMinimo({ salarioMinimoAnualDesde1994, salarioMinimoAnualUltimosDezAnos, estimativas }) {

  return (
    <Layout>
      <Head>
        <title>Salário Mínimo No Brasil</title>
        <meta name="description" content="Evolução do Salário Mínimo no Brasil desde a Criação do Plano real. Dados consolidados e estimativas."></meta>
      </Head>
      <div className="container">
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Salário Mínimo no  Brasil</h1>
        </div>
        <div className="mt-4">
          <p className="text-base text-gray-500">Salário mínimo nominal vigente - não considera abonos salariais ocorridos nos períodos. 
          O salário mínimo urbano foi instituído no Brasil por decreto-lei do presidente Getúlio Vargas, durante a ditadura 
          do Estado Novo, e começou a vigorar em julho de 1940, com valores diferenciados entre estados e sub-regiões. Em 1943, 
          foi incorporado à Consolidação das Leis do Trabalho (CLT) e, em 1963, foi estendido ao campo por meio do Estatuto do 
          Trabalhador Rural. Foi nacionalmente unificado em maio de 1984, mas, desde 2000, a Lei Complementar 103 permite que os 
          estados fixem pisos estaduais superiores ao mínimo nacional. Nota: Os dados desta série para o período em que a legislação
           federal definia faixas diversificadas referem-se ao maior salário mínimo vigente no país. Mais informações: 
           www.dieese.org.br/analisecestabasica/salarioMinimo.html e Evolução dos salários mínimos regionais.</p>
        </div>
        <div>
          <div className="mt-6">
          <hr></hr>
            <h5 className="mt-2 uppercase text-base font-bold text-gray-500">Últimos 10 anos</h5>
          </div>
          <div className="grid mt-2 gap-4 md:grid-cols-5 lg:grid-cols-10">
            {salarioMinimoAnualUltimosDezAnos.map(item => (
              <div key={item.VALDATA} className="p-4 bg-white  rounded shadow">
                <div>
                  <span className="text-xs font-semibold text-gray-400">{new Date(item.VALDATA).getFullYear()}</span>
                </div>
                <div className="flex justify-start items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-azul mr-2" />
                  <h1 className="text-xs font-bold">R$ {transformarBR(item.VALVALOR)}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
           <hr></hr>
            <h4 className="mt-2 uppercase text-base font-bold text-gray-500">Estimativa para as próximas Décadas</h4>
          </div>
          <div className="grid mt-2 gap-4 md:grid-cols-5 lg:grid-cols-10">
            {estimativas.map(item => (
              <div key={item.ano} className="p-4 bg-white  rounded shadow">
                <div>
                  <span className="text-xs font-semibold text-gray-400">{item.ano}</span>
                </div>
                <div className="flex justify-start items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-azul mr-2" />
                  <h1 className="text-xs font-bold">R$ {transformarBR(item.valor)}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <hr></hr>
            <h4 className="mt-2 uppercase text-base font-bold text-gray-500">Evolução Desde a Implantação do Plano Real</h4>
          </div>
        <div className="grid mt-2 gap-2 md:grid-cols-1 lg:grid-cols-1">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-xs text-gray-400">Fonte: Ipeadata</p>
            <LineChartComponent labels={salarioMinimoAnualDesde1994.map(item => new Date(item.VALDATA).getFullYear())} 
            valores={salarioMinimoAnualDesde1994.map(item => item.VALVALOR)} titulo={"Salário Mínimo (R$)"} />
            <div className="grid gap-2 mt-4 md:grid-cols-7 lg:grid-cols-10">
        {salarioMinimoAnualDesde1994.map(item => (
          <div  key={item.VALDATA} className="p-1 bg-white text-center rounded shadow">
            <div>
              <span className="text-sm font-bold text-gray-400"> {new Date(item.VALDATA).getFullYear()}:</span>
              <span className="text-sm font-bold text-black"> R$: {transformarBR(item.VALVALOR)}</span>
            </div>
          </div>
        ))
        }
      </div>
          </div>
      
        </div>


        </div>
        <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
        <div className="mt-6">
          <hr></hr>
            <h5 className="mt-2 uppercase text-base font-bold text-gray-500">Perguntas e Respostas</h5>
          </div>
          <div className="bg-white p-6 rounded shadow">
          <p className="text-base font-bold text-gray-500">Quando foi instituído o salário mínimo no Brasil?</p>
            <p className="text-base text-gray-500">O salário mínimo urbano foi instituído no Brasil por decreto-lei do presidente Getúlio Vargas, durante a ditadura 
          do Estado Novo, e começou a vigorar em julho de 1940, com valores diferenciados entre estados e sub-regiões.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const estimativas = dadosEstimativas();
  const salarioMinimo = await fetch(`${server}/api/salarioMinimo`)
  const salarioMinimoMensalTotal = await salarioMinimo.json()
  const salarioMinimoAnualDesde1994 = await salarioMinimoMensalTotal.value.filter(
    item => new Date(item.VALDATA).getFullYear() > 1993  && new Date(item.VALDATA).getMonth() === 11)
  const salarioMinimoAnualUltimosDezAnos = await salarioMinimoMensalTotal.value.filter(
    item => new Date(item.VALDATA).getFullYear() > new Date().getFullYear() - 10 && new Date(item.VALDATA).getMonth() === 11)
  return {
    props: {salarioMinimoAnualDesde1994, salarioMinimoAnualUltimosDezAnos, estimativas }
  }
}

function transformarBR(number) {
  return number.toLocaleString('pt-br', { maximumFractionDigits: 2 })
}

function dadosEstimativas(){
  let dados =  [
     {ano: 2030, valor: transformarBR(1848)},
     {ano: 2040, valor: transformarBR(3270)},
     {ano: 2050, valor: transformarBR(5784)},
     {ano: 2060, valor: transformarBR(10233)},
     {ano: 2070, valor: transformarBR(18103)}
    ]
return dados
}


export default SalarioMinimo
