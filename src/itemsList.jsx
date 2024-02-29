import LineItem from "./LineItem"

const itemsList = ({items,handleCheck,handleDelete}) => {
  return (
    <>
      <ul >
        {
          items.map((itemss) => 
          <LineItem 
          key={itemss.id}
          itemss = {itemss}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
          />
          )
        }
      </ul>
    </>
  )
}

export default itemsList
