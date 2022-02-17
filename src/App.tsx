import React from 'react'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

function App({ children }: { children: React.ReactNode }) {
    return (
        <div className="App bg-primary h-screen w-screen overflow-y-scroll scroll-smooth hover:scroll-auto">
            <ThemeProvider theme={theme}>
                {/*TODO something*/}
                {children}
            </ThemeProvider>
        </div>
    )
}

export default App
