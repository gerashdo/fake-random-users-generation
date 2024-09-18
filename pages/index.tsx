import { useEffect, useState } from "react"
import { User } from "@/interfaces/user"
import { Region } from "@/interfaces/region"
import { Toolbar } from "@/components/Toolbar"


export default function Home() {
  const [region, setRegion] = useState<Region>('en_US')
  const [seed, setSeed] = useState<string>('0')
  const [sliderValue, setSliderValue] = useState<string>('0')
  const [errorsInput, setErrorsInput] = useState<string>('0')
  const [errors, setErrors] = useState<string>('0')
  const [data, setData] = useState<User[]>([])
  const [, setLoading] = useState(false)

  const fetchUsers = async (pageNum: number) => {
    setLoading(true);
    const response = await fetch(`/api/generateUsers?region=${region}&errors=${errors}&seed=${seed}&page=${pageNum}`)
    const data = await response.json();
    setData((prev) => [...prev, ...data.users]);
    setLoading(false);
  }

  useEffect(() => {
    setData([])
    fetchUsers(1).then(() => fetchUsers(2))
  }, [region, errors, seed])

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
    setSeed(Math.floor(Math.random()*10000).toString())
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
      />

      <div className="border rounded-md overflow-hidden shadow-md">
        <div className="bg-gray-50 p-4 border-b text-center">
          <h2 className="text-lg font-semibold text-gray-700 uppercase">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identifier</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  // ref={index === data.length - 1 ? lastElementRef : null}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
