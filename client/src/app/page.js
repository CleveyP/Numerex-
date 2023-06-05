import Image from 'next/image'
import styles from './page.module.css'
import { Header } from '@/components/header/Header';
import { HomePage } from '@/components/home/HomePage';


export default function Home() {

  return (
    <main className={styles.main}>
      {/* <Header/> */}
      <HomePage/>
    </main>
  );
}
