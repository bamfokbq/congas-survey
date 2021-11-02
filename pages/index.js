import Head from 'next/head'
import VendorSurveyForm from '../components/VendorSurveyForm/VendorSurveyForm';

export default function Home() {
  return(
    <div>
    <Head>
      <title>ConGas Vendor Survey</title>
    </Head>
    <VendorSurveyForm />
    </div>
  )
}
