
const Personlist = ({ personArr, deleteHandle}) => {
    
    console.log(personArr)
    return (
      <div>
        {personArr.map((element) => (
        <li key={element.id}>
          {element.name} {element.number} <button onClick={() => {deleteHandle(element)}}> delete</button>
        </li>
      ))}
      </div> 
    )
  }
  
  export default Personlist