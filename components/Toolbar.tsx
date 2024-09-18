import { Region, regionNames } from "@/interfaces/region";

interface ToolbarProps {
  region: Region;
  onRegionChange: (region: Region) => void;
  sliderValue: number;
  onSliderChange: (value: number) => void;
  errors: string;
  onErrorsChange: (errors: string) => void;
  seed: string;
  onSeedChange: (seed: string) => void;
  onGenerateRandomSeed: () => void;
}

export const Toolbar = ({
  region,
  onRegionChange,
  sliderValue,
  onSliderChange,
  errors,
  onErrorsChange,
  seed,
  onSeedChange,
  onGenerateRandomSeed,
}: ToolbarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="space-y-2">
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
        <select
          id="region"
          value={region}
          onChange={(e) => onRegionChange(e.target.value as Region)}
          className="block w-full px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none"
        >
          <option value="">Select region</option>
          {Object.entries(regionNames).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="slider" className="block text-sm font-medium text-gray-700">Slider</label>
        <input
          id="slider"
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-sm text-gray-500 text-center">{sliderValue}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="errors" className="block text-sm font-medium text-gray-700">Number of errors</label>
        <input
          id="errors"
          type="number"
          value={errors}
          onChange={(e) => onErrorsChange(e.target.value)}
          className="block w-full px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="seed" className="block text-sm font-medium text-gray-700">Seed number</label>
        <div className="flex rounded-md shadow-sm">
          <input
            id="seed"
            type="text"
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            className="flex-grow px-3 py-2 text-base border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            onClick={onGenerateRandomSeed}
            className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}
