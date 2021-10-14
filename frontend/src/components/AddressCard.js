const AddressCard = ({ direction, formik }) => {
   const { alias, _id, ...directionNoAlias } = direction
   return (
      <div >
         <div>
            <div className="checkoutContainerCard">
               <div className="dataCard">
                     <p>Receiver : {direction.receiver}</p>
                     <p>Street : {direction.street}</p>
                     <p>Number : {direction.number}</p>
                     <p>Department : {direction.department}</p>
                     <p>Zip Code : {direction.zipCode}</p>
                     <p>City : {direction.city}</p>
                     <p>State : {direction.state}</p>
               </div>
               <button
                  type="button"
                  className="addProduct"
                  style={{
                     backgroundImage: `url("https://i.postimg.cc/GhMnJB8K/button-PDF.png")`,
                  }}
                  onClick={() => formik.setValues(directionNoAlias)}
               >
                   Select this Address 
               </button>
            </div>
         </div>
      </div>
   )
}

export default AddressCard
