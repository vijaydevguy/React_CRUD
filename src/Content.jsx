import ItemsList from "./itemsList"

const Content = ({handleCheck,handleDelete,items}) => {
  // console.log('Items in Content:', items);
  return (
    <>
      {(items.length) ? (
      <ItemsList 
      handleCheck = {handleCheck}
      handleDelete = {handleDelete}
      items = {items}
      />

    ) : (<p style={{fontWeight:"bold"}}>Empty list</p>)}

    </>
  )
}

export default Content
