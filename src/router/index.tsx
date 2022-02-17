import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Search from '../pages/Search'
import PrimaryLayout from '../layout/PrimaryLayout'

function NotFound() {
    return (
        <PrimaryLayout>
            <div className="flex items-center flex-col mt-10 text-3xl">
                <h1 className="text-5lx my-10">404</h1>
                <h2>
                    Hi! This is not the SimplyTrends web page you are looking
                    for.
                </h2>
            </div>
        </PrimaryLayout>
    )
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:keyword" element={<Search />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
