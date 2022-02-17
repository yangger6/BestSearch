import { IProductTrendItem } from '../../service/interviewService'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Chart, AreaSeries } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { date2MonthName } from '../../utils/dateHelper'
import SanitizeHTML from '../SanitizeHTML/SanitizeHTML'
import { curveCatmullRom, area } from 'd3-shape'

interface ITrendCardProps {
    record: IProductTrendItem
}

// just smooth path
const Area = (props: AreaSeries.SeriesProps) => {
    const path: any = area()
        .x(({ arg }: any) => arg)
        .y1(({ val }: any) => val)
        .y0(({ startVal }: any) => startVal)
        .curve(curveCatmullRom)

    return <AreaSeries.Path {...props} path={path} />
}

export default function TrendCard(props: ITrendCardProps) {
    const { keyword } = useParams()
    // format origin trendData to render
    const formatTrendData = useMemo(() => {
        const copyRecord: IProductTrendItem = JSON.parse(
            JSON.stringify(props.record)
        )
        // keyword to bold
        if (keyword && copyRecord.name) {
            const boldWordsRegEpx = new RegExp(
                keyword.split('+').join('|'),
                'g'
            ) // words match
            copyRecord.name = copyRecord.name.replace(
                boldWordsRegEpx,
                (word: string) => `<b>${word}</b>`
            )
        }
        // computed date
        if (copyRecord.search_msv?.length) {
            const startDate = copyRecord.search_msv[0]?.date
            const endDate =
                copyRecord.search_msv[copyRecord.search_msv.length - 1]?.date
            copyRecord.date = `${date2MonthName(startDate)} - ${date2MonthName(
                endDate
            )}`
        }
        return copyRecord
    }, [props.record, keyword])
    return (
        <section className="bg-white rounded flex h-full flex-col">
            <header className="text-xl p-4">
                <SanitizeHTML html={formatTrendData.name} />
                <p className="desc text-sm text-black/40 pt-2">
                    Growth {Math.floor(Math.random() * 100)}%
                </p>
            </header>
            <main className="trend-card-box flex-1 h-full mt-10">
                <Chart data={formatTrendData.search_msv}>
                    <AreaSeries
                        valueField="sv"
                        argumentField="date"
                        seriesComponent={Area}
                    />
                    <Animation />
                </Chart>
            </main>
            <footer className="text-black/40 flex items-center justify-center h-8">
                {formatTrendData.date}
            </footer>
        </section>
    )
}
