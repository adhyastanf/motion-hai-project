'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLoader } from './loader-provider'


const LoadingScreen = () => {
  const { isLoading } = useLoader()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="text-2xl font-bold"
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
