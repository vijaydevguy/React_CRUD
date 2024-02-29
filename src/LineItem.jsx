import { FaTrashAlt } from "react-icons/fa"



const LineItem = ({itemss,handleCheck,handleDelete}) => {
  return (
    <>
      <li key={itemss.id} className="item">
            
            <input 
            type="checkbox"  
            checked={itemss.checked}
            onChange={() => handleCheck(itemss.id)}
            />
           <label 
              htmlFor="#"
              style={itemss.checked ? {textDecoration: "line-through"} : null}
            >
              {itemss.item}
            </label>

            <FaTrashAlt 
            role="button"
            tabIndex="0"
            onClick={(id) => handleDelete(itemss.id)}
            aria-label={`Delete ${itemss.item}`}
            />

          </li>
    </>
  )
}

export default LineItem
