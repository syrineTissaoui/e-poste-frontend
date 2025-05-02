import { Helmet } from 'react-helmet-async'
import Banner from './Banner/Banner'
import OurFeatures from './NosFonctionnaliter/NosFonctionnaliter'
import TopDeliveryMans from './TopDeliveryMans/TopDeliveryMans'



const Home = () => {
  return (
    <div className=''>
      <Helmet>
        <title>E-poste</title>
      </Helmet>
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <TopDeliveryMans></TopDeliveryMans>
      
    </div>
  )
}

export default Home
