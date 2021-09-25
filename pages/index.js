import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Eldu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="flex flex-wrap items-center justify-around">
          <Link href="/populacao">
            <a
              href="/populacao"
              className="p-6 mt-6 text-left border w-full  rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">População &rarr;</h3>
              <p className="mt-4 text-xl">
                Dados da População do Brasil em tempo real.
            </p>
            </a>
          </Link>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-full rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Governo e Economia &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-full rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Sociedade e Mídia &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-full rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Comida &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>

    </Layout>
  )
}
