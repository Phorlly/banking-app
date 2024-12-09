import Header from '@/components/header'
import RightSidebar from '@/components/right-sidebar'
import TotalBalance from '@/components/total-balance'
import { getLoggedInUser } from '@/lib/actions/user'
import React from 'react'

const Home = async () => {
    const loggedIn = await getLoggedInUser();
    
    return (
        <section className='home'>
            <div className="home-content">
                <header className="home-header">
                    <Header
                        type="greeting"
                        title="Welcome"
                        subtitle="Access and manage your account and translations efficiently."
                        user={loggedIn.name || "Guest"}
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
                banks={[{ currentBalance: 13405 }, { currentBalance: 13405 }]}
            />
        </section>
    )
}

export default Home