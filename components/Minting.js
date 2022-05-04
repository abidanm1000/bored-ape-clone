import tw from 'tailwind-styled-components'
import { useAddress, useDisconnect, useMetamask, useEditionDrop } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';


const Minting = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [completed, setCompleted] = useState(false);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const editionDrop = useEditionDrop("0xa7a7C0Db83f6519d768e61d019eAAc8cC882f6aE")
    console.log(address)

    const mint = async () => {
        if(editionDrop && address) {
            setInProgress(true);
            const tx = await editionDrop.claimTo(address, 0, 1)
            console.log(tx)
            setInProgress(false);
            setCompleted(true);
        }
    }

    const viewOpenSea = () => {
        const url = 'https://testnets.opensea.io/collection/bored-ape-clone-v3'
        window.open(url, '_blank')
    }

    const startOver = () => {
        setCompleted(false);
        setInProgress(false);
        disconnectWallet();
    }

    useEffect(()=> {
        const getTotal = async () => {
            if(editionDrop) {
                const total = await editionDrop.totalSupply(0);
                setTotalSupply(total.toNumber());
            }
        }
        getTotal();
    }, [editionDrop])

  return (
    <Container>
        <Mint>
            <TitleContainer>
                <Title>Welcome to<br/> the Bored Ape<br/> Yacht Club</Title>
                <Count>
                    {address && totalSupply}
                </Count>
            </TitleContainer>
            <ButtonContainer>
                {
                    address
                        ? <>
                            {
                                completed
                                    ? <FilledButton onClick={viewOpenSea}>
                                        View OpenSea
                                    </FilledButton>
                                    :<FilledButton disabled={inProgress} onClick={mint}>
                                        {
                                            inProgress
                                                ? <ReactLoading type='bubbles' color='#000' height={64} />
                                                : <>Mint</>
                                        }
                                    </FilledButton>
                            }
                            
                            <UnfilledButton disabled={inProgress} onClick={()=>{disconnectWallet(); startOver();}}>
                                Disconnect
                            </UnfilledButton>
                        </>
                        : <FilledButton onClick={connectWithMetamask}>
                            Connect Wallet
                        </FilledButton>
                        
                }
            </ButtonContainer>
        </Mint>
    </Container>
  )
}

export default Minting

const Count = tw.div`
    flex
    grow
    items-center
    justify-center
`

const FilledButton = tw.button`
    bg-[#bfc500] 
    hover:bg-white 
    text-black 
    font-bold 
    py-2 
    px-4 
    rounded 
    uppercase
    grow
    flex-1
    h-14
    flex
    justify-center
    items-center
`
const UnfilledButton = tw(FilledButton)`
    bg-black
    text-[#bfc500]
    border-2
    border-[#bfc500]
    hover:bg-[#bfc500]
    hover:text-black
`

const ButtonContainer = tw.div`
    flex
    mt-2
    gap-4
`

const Mint = tw.div`
    max-w-screen-sm
    lg:w-1/3
    md:w-1/2
    bg-black
    lg:mt-[-200px]
    z-50
    flex
    flex-col
    pb-4
    pr-4
`

const Title = tw.h2`
    uppercase
    text-3xl
    italic
    font-bold
    mt-3
`

const TitleContainer = tw.div`
    flex
`

const Container = tw.div`
    max-w-screen-lg
    w-full
    z-50
`