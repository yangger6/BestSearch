import { Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
interface IPrimaryLayoutProps {
    header?: React.ReactNode
    children: React.ReactNode
}
export default function PrimaryLayout(props: IPrimaryLayoutProps) {
    return (
        <>
            <header className="flex w-full items-center border-b border-black/40 sticky top-0 bg-primary z-10">
                <div className="logo">
                    <Link
                        to="/"
                        className="flex text-lg xl:text-3xl lg:text-2xl"
                    >
                        <div className="logo--default hidden md:block">
                            <span className="font-bold">Best</span>
                            <span>Search</span>
                        </div>
                        <div className="logo--mini block md:hidden flex items-center justify-center font-bold bg-black text-white rounded">
                            ST
                        </div>
                    </Link>
                </div>
                <div className="header-container flex-1">{props.header}</div>
                <div
                    className="header-actions invisible hidden lg:block"
                    style={{ width: '300px' }}
                >
                    {/*TODO user actions*/}
                </div>
            </header>
            <main>
                <Container maxWidth="lg">{props.children}</Container>
            </main>
        </>
    )
}
