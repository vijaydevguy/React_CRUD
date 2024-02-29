import {  useEffect, useState } from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import apiRequest from './apiRequest'

function App() {

  const [fetchError, setFetchError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = "http://localhost:3500/items"

  const [items, setItems] = useState( []

    //below line will mentioned within the useeffect
    // JSON.parse(localStorage.getItem("todo_list"))


    // [
    //   {
    //     id:1,
    //     checked : false,
    //     item : "Practice Codidng"
    //   },
    //   {
    //     id:2,
    //     checked : true,
    //     item : "Play Cricket"
    //   },
    //   {
    //     id:3,
    //     checked : false,
    //     item : "Learn coding"
    //   }
    // ] this lists are hardcoded so we are going to store in local 
    
    )
    // console.log(items)

    // this before connect data server
    // useEffect(() => {
    //   const storedItems = JSON.parse(localStorage.getItem("todo_list")) || [];
    //   setItems(storedItems);
    // }, []);

    useEffect(() => {
        const fetchItems  = async() => {
            try{
              //fetching api
              const response = await fetch(API_URL)
              // console.log(response)

              if (!response.ok) throw Error ("Data not received")
              
              //convert json format
              const listItems =await response.json() 
              // console.log(listItems)
              setItems(listItems)
              setFetchError(null)
            }
            catch(err){
              // console.log(err.message)
              setFetchError(err.message)
            }
            finally{
              setIsLoading(false)
            }
        }
      setTimeout(() => {
        (async () => fetchItems())()
      },2000)

       
      }, []);
      
    

  // const numbers = [0,-1,-2,2 ,3]

  // const result = numbers.map((numbers) => {return numbers})
  // console.log(result)


  const handleCheck =async (id) => {
    // console.log(`id: ${id}`)

    // here we are using the copy of the items only not changing directly.
    const listItems  = items.map((item) => item.id === id ? {...item, checked : !item.checked} : item)
    setItems(listItems)
    //after connecting api no need local storage
    // localStorage.setItem("todo_list",JSON.stringify(listItems))

    const myItem = listItems.filter((item) => item.id === id)

    const updateOptions = {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({checked : myItem[0].checked})
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if(result) setFetchError(result)
  }

  const handleDelete =async (id) => {
    // console.log(`id: ${id}`)

    // here we are using the copy of the items only not changing directly.
    const listItems  = items.filter((item) => item.id !== id )
    setItems(listItems)
    //we are temporarily storing into local storage

    // localStorage.setItem("todo_list",JSON.stringify(listItems))
        //after connecting api no need local storage

    const deleteOptions = {method: "DELETE"}

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)

  }

  const [newItem, setNewItem] = useState("")

  const addItem = async(item) => {
    const id = items.length ? items[items.length - 1].id += 1 : 1
    const addNewItem = {id,checked:false,item}
    const listItems =[...items, addNewItem]
    // console.log('New Items:', listItems);
    setItems(listItems)

    //after connecting api no need local storage
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
    // console.log(items)

    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("submitted")
    if(!newItem.trim()) return
    // console.log(newItem)
    //add
    addItem(newItem)

    //below line is for after submitting or adding some value it will become empty to ready for getting next input.
    setNewItem('')
  }

  //searching

  const [search,setSearch] = useState("")

  const showItems = items.filter(itemss => itemss.item.toLowerCase().includes(search.toLowerCase()))
 

  return (
    <div className='App'>
      <Header title = "My todo"/>
      <AddItem 
      newItem = {newItem}
      setNewItem = {setNewItem}
      handleSubmit = {handleSubmit}
      />
      <SearchItem 
        search = { search}
        setSearch = {setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}


          { !isLoading && !fetchError &&
            <Content 
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
          // items = {items}
          // this is passing the items so i will filter directly here
          items={showItems}
          />
          }


      </main>
     
      <Footer 
      leng = {items.length}
      />
    </div>
  )
}

export default App
