import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { TableContentRow } from "@/components/TableContentRow"
import { Toolbar } from "@/components/Toolbar"
import { User } from "@/interfaces/user"
import { Region } from "@/interfaces/region"
import { useDebouncedValue } from "@/hooks/useDebounce"


export default function Home() {
  const [region, setRegion] = useState<Region>("en_US")
  const [seed, setSeed] = useState<string>("0")
  const [sliderValue, setSliderValue] = useState<string>("0")
  const [errorsInput, setErrorsInput] = useState<string>("0")
  const [errors, setErrors] = useState<string>("0")
  const [data, setData] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const errorsDebounced = useDebouncedValue(errors)
  const seedDebounced = useDebouncedValue(seed)

  const fetchUsers = async (pageNum: number, first?: boolean) => {
    const response = await fetch(
      `/api/generateUsers?region=${region}&errors=${errorsDebounced}&seed=${seedDebounced}&page=${pageNum}`
    )
    const newData = await response.json()
    if (first) {
      setData(newData.users)
      return
    }
    setData((prev) => [...prev, ...newData.users])
    setHasMore(newData.users.length > 0)
  }

  useEffect(() => {
    firstLoad()
  }, [region, errorsDebounced, seedDebounced])

  const firstLoad = async () => {
    setIsLoading(true)
    setPage(3)
    await fetchUsers(1, true)
    await fetchUsers(2)
    setIsLoading(false)
  }

  const loadMoreData = () => {
    setIsLoading(true)
    fetchUsers(page)
    setPage((prevPage) => prevPage + 1)
    setIsLoading(false)
  }

  const onChangeErrorsSlider = (value: string) => {
    setSliderValue(value)
    setErrorsInput(value)
    setErrors(value)
  }

  const onChangeErrorsInput = (value: string) => {
    setErrorsInput(value)
    if (parseInt(value) >= 0 && parseInt(value) <= 10) {
      setSliderValue(value)
    }
    setErrors(value)
  }

  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 10000).toString())
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Toolbar
        region={region}
        onRegionChange={setRegion}
        sliderValue={sliderValue}
        onSliderChange={onChangeErrorsSlider}
        errorsInputValue={errorsInput}
        onInputErrorsChange={onChangeErrorsInput}
        seed={seed}
        onSeedChange={setSeed}
        onGenerateRandomSeed={generateRandomSeed}
        isLoading={isLoading}
      />

      <div className="border rounded-md overflow-hidden shadow-md">
        <div className="bg-gray-50 p-4 border-b text-center">
          <h2 className="text-lg font-semibold text-gray-700 uppercase">Users</h2>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more users to load.</p>}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Index
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Identifier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <TableContentRow key={item.id} user={item} index={index} />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  )
}
