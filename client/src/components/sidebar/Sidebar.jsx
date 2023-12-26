import SectionItem from "./SectionItem";
import "./css/Sidebar.css";


const Sidebar = () => {
  return (
    <section className="sideBar">
        <SectionItem text={"Home"} link={"/"}/>
        <SectionItem text={"Show Questions"} link={"/showquestion"}/>
        <SectionItem text={"Create Question"} link={"/createquestion"}/>
    </section>
  )
}

export default Sidebar
