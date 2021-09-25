
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
export default function Layout(props) {
  return (
    
    <div className="flex flex-col min-h-screen bg-gray-100">
       <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1 lg:container lg:mx-auto px-2 py-2">
        {props.children}
      </main>
      <Footer />
    </div>
  )
};