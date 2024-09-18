import { useState } from "react"
import { User } from "@/interfaces/user"
import { Region } from "@/interfaces/region"
import { Toolbar } from "@/components/Toolbar"


export default function Home() {

  const [region, setRegion] = useState<Region>('en_US')
  const [seed, setSeed] = useState<string>('')
  const [sliderValue, setSliderValue] = useState<number>(50)
  const [errors, setErrors] = useState('0')
  const [data, setData] = useState<User[]>([])

  const generateRandomSeed = () => {
    // setSeed(Math.random().toString(36).substr(2, 9))
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Toolbar
        region={region}
        onRegionChange={setRegion}
        sliderValue={sliderValue}
        onSliderChange={setSliderValue}
        errors={errors}
        onErrorsChange={setErrors}
        seed={seed}
        onSeedChange={setSeed}
        onGenerateRandomSeed={generateRandomSeed}
      />

      <div className="border rounded-md overflow-hidden shadow-md">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Data Table</h2>
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
