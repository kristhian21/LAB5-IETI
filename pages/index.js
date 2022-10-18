import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Task App</title>
      </Head>
      <Login />
      <style jsx>{`
        div {
          background-image: url(https://i.postimg.cc/xT3rSWd2/wallhaven-xl6v7v-1920x1080.png);
          background-size: cover;
          display: grid;
          place-content: center;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}
