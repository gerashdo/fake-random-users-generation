import { motion } from "framer-motion"
import { User } from "@/interfaces/user"


interface TableContentRowProps {
  user: User
  index: number
}

export const TableContentRow = ({ user, index}: TableContentRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
    </motion.tr>
  )
}
