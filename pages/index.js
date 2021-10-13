import Head from 'next/head'
import Link from 'next/link'
import { UserGroupIcon, CurrencyDollarIcon, CashIcon } from '@heroicons/react/solid'

export default function Home() {
  return (
    <>
      <Head>
        <title>Eldu</title>
        <meta name="description" content="Dados históricos e atuais do Brasil de um jeito descomplicado."></meta>
      </Head>
      <div className="bg-gradient-to-br from-indigo-900 to-green-900 min-h-screen overflow-auto">
        <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1">
          <div className="w-4/5">
            <h1 className="mt-32 text-white text-6xl font-bold">Dados históricos e atuais do Brasil</h1>
          </div>
          <div className="w-5/6 my-10 ml-6">
            <h3 className="text-gray-300">
              População, Governo e Economia, Sociedade e Mídia, Meio Ambiente, Alimentação, Água, Energia, Saúde <br />
              <strong className="text-white">Estimativas e cálculos baseadas em dados existentes</strong>
            </h3>
          </div>
          <div className="hidden sm:block opacity-50 z-0">
            <div className="shadow-2xl w-96 h-96 rounded-full -mt-72"></div>
            <div className="shadow-2xl w-96 h-96 rounded-full -mt-96"></div>
            <div className="shadow-xl w-80 h-80 rounded-full ml-8 -mt-96"></div>
          </div>
          </div>
          <div className="text-white relative">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4">
            
            <Link href="/populacao">
              <a>
              <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
                <UserGroupIcon className="h-8 w-8" />
                <div>
                  <span>População</span>
                  <span className="text-xs text-blue-300 block">Evolução da População Brasileira desde 1550</span>
                </div>
                <div>
                  <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                </div>
              </div>
              </a>
            </Link>
            <Link href="/salarioMinimo">
              <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
                <CurrencyDollarIcon className="h-8 w-8 mr-2"/>
                <div>
                  <span>Salário Mínimo</span>
                  <span className="text-xs text-blue-300 block">Dados consolidados e estimativas</span>
                </div>
                <div>
                  <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                </div>
              </div>
              </Link>
             <Link href="/cdi">
              <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
                <CashIcon className="h-8 w-8 mr-2" />
                <div>
                  <span>CDI</span>
                  <span className="text-xs text-blue-300 block">Dados consolidados</span>
                </div>
                <div>
                  <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                </div>
              </div>
              </Link>
             <Link href="/ipca">
              <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
                <CashIcon className="h-8 w-8 mr-2" />
                <div>
                  <span>IPCA</span>
                  <span className="text-xs text-blue-300 block">Dados consolidados</span>
                </div>
                <div>
                  <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                </div>
              </div>
              </Link>
              <Link href="/igpm">
              <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
                <CashIcon className="h-8 w-8 mr-2" />
                <div>
                  <span>IGPM</span>
                  <span className="text-xs text-blue-300 block">Dados consolidados</span>
                </div>
                <div>
                  <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
