import Head from 'next/head'
import Login from '../components/login'

export default function Index() {
  return (
    <div className="main-container centered-container">
      <Head>
        <title>Task App</title>
      </Head>
      <Login />
    </div>
  )
}
