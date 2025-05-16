import AboutSection from './utils/AboutSection'
import ActivitiesSection from './utils/ActivitiesSection'
import ContactSection from './utils/ContactSection'
// import FooterProfileApp from './utils/FooterProfileApp'
import HeaderProfileApp from './utils/HeaderProfileApp'

const ProfileApp = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-gray-50'>
      {/* Hero Section */}
      <HeaderProfileApp />

      <main className='container w-full flex-1 space-y-8 py-8'>
        {/* About Section */}
        <AboutSection />

        {/* Activities Section */}
        <ActivitiesSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
      {/* <FooterProfileApp /> */}
    </div>
  )
}

export default ProfileApp
