import { Link } from "react-router-dom"


const SectionItem = ({ text, link }) => {
  return (
    <Link to={link}>
    <div className="sideBarItem">
      <h3>{text}</h3>
    </div>
    </Link>
  )
}

export default SectionItem
