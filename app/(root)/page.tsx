import Header from '@/components/header'
import RightSidebar from '@/components/right-sidebar'
import TotalBalance from '@/components/total-balance'
import React from 'react'

const Home = () => {
    const loggedIn = { firstName: "Phorlly", lastName: "LANN", email: "phorlly@gmail.com" }
    return (
        <section className='home'>
            <div className="home-content">
                <header className="home-header">
                    <Header
                        type="greeting"
                        title="Welcome"
                        subtitle="Access and manage your account and translations efficiently."
                        user={loggedIn?.firstName || "Guest"}
                    />

                    <TotalBalance
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1230.54}
                    />
                </header>

                recent transactions
            </div>

            <RightSidebar
                user={loggedIn}
                transaction={[]}
                banks={[{ currentBalance: 13405.86 }, { currentBalance: 13405.53 }]}
            />
        </section>
    )
}

export default Home