import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { UserGroupIcon, CurrencyDollarIcon, CashIcon } from '@heroicons/react/solid'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Eldu</title>
        <meta name="description" content="Dados históricos e atuais do Brasil de um jeito descomplicado."></meta>
      </Head>
      <div className="container">
        <div className="flex justify-between">
          <div className="mt-4">
            <h4 className="text-sm font-semi-bold text-indigo-600">Dados históricos e atuais do Brasil de um jeito descomplicado.</h4>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div className="grid mt-4 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <Link href="/populacao">
              <a>
                <div className="p-6 bg-white  rounded-xl shadow-lg">
                  <div className="flex justify-start items-center">
                    <UserGroupIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-2xl font-bold">População</h3>
                  </div>
                </div>
              </a>
            </Link>
            <Link href="/salarioMinimo">
              <a>
                <div className="p-6 bg-white  rounded-xl shadow-lg">
                  <div className="flex justify-start items-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-2xl font-bold">Salário Mínimo</h3>
                  </div>
                </div>
              </a>
            </Link>
            <Link href="/cdi">
              <a>
                <div className="p-6 bg-white  rounded-xl shadow-lg">
                  <div className="flex justify-start items-center">
                    <CashIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h3 className="text-2xl font-bold">CDI</h3>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  )
}
