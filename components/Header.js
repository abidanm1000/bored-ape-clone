import tw from 'tailwind-styled-components'
import Image from 'next/image'
import logo from '../assets/logo.webp'

const Header = () => {
  return (
    <Container>
        <HeaderContainer>
            <Image
                width={300}
                height={78}
                src={logo}
                alt='Logo'
            />
        </HeaderContainer>
    </Container>
  )
}

export default Header

const HeaderContainer = tw.div`
    mt-[30px]
`

const Container = tw.div`
    flex
    justify-center
    h-20
`