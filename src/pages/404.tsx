import { useEffect } from "react"
import { navigate } from "gatsby"

const NotFound = () => {
  useEffect(() => navigate("/authorize"))
  return null
}

export default NotFound
