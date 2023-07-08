import React ,{useState,useEffect} from "react";
import "./style.css";

const getlocalstoragedata =()=>{
  const lists = localStorage.getItem("todo");

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
};

const Todo = () => {
  const [inputItem, setInputItem] = useState("");
  const [item,setItem] = useState(getlocalstoragedata());
  const [isedit,setIsedit] = useState("");
  const [togglebtn,setTogglebtn] = useState(false);
  
  const addItem = ()=>{
    if(!inputItem){
      alert("pls fill the field!");
    }
    else if(inputItem && togglebtn){
      setItem(
        item.map((currItem)=>{
          if(currItem.id === isedit){
            return {...currItem,name:inputItem}

          }
          return currItem;
        })
      );
      setInputItem([]);
    setIsedit('');
    setTogglebtn(false);

    }
    else{
      //  for creating a unique id
      const newInput = {
        id: new Date().getTime().toLocaleString(),
        name:inputItem,
      };
      // console.log(newInput);
      setItem([...item,newInput]);
      setInputItem("");  //for empty the inp field after clicking
    }
   
  };

  // editing the Items

  const editItem = (index)=>{
    const item_edited = item.find((currItem)=>{
      return currItem.id === index;
    })
    setInputItem(item_edited.name);
    setIsedit(index);
    setTogglebtn(true);
  }
  

  //  for deleting the todo
  const deleteItems = (index)=>{
    const updatedList = item.filter((currItem)=>{
      return currItem.id !== index;
    });
    setItem(updatedList);
    // console.log(updatedList);
  }
  // remove all button
const removeAll = ()=>{
  setItem([]);
}
// adding localstorage
useEffect(()=>{
  localStorage.setItem("todo",JSON.stringify(item))

},[item])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="image_svg" />
            <figcaption>Add your list here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              className="form-control"
              placeholder="✍️ add items"
              value = {inputItem}
              onChange = {(e)=> setInputItem(e.target.value)}

              
            />
            {
              togglebtn ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }
            {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
          </div>
          {/* show todos
           */}
          <div className="showItems">
            {
              item.map((currItem)=>{
                return (
                <div className="eachItem" key={currItem.id}>
              <h3>{currItem.name}</h3>
              <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={()=> editItem(currItem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=> deleteItems(currItem.id)}></i>
              </div>
            </div>
            )
              })
            }
          </div>

          {/* remove all button */}

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;


// process
// after creating ui create usestate and give onclick to plus btn and using another use state map the items in show Items class if input field is empty give an alert also
// after clicking + btn the input field should be empty
// for delete we need one id we need to create it using a new object

// add onclick to delete and if the index is equal to the id then expect that return remaining elements

// for remove all button add onclick and in onclick pass one empty array thats it

// add local storage 

// at last add the edit btn