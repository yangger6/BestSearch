import PrimaryLayout from '../layout/PrimaryLayout'
import SearchBar from '../components/SearchBar/SearchBar'

export default function Home() {
    return (
        <PrimaryLayout>
            <div className="home-page flex flex-col items-center">
                <h1 className="text-4xl my-20">Search Trends</h1>
                <SearchBar />
            </div>
        </PrimaryLayout>
    )
}
