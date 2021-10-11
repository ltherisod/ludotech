const AddressCard = ({ direction, formik }) => {
   const { alias, _id, ...directionNoAlias } = direction
   return (
      <div>
         <div>
            <div className="checkoutContainer">
               <div className="d-flex">
                  <div className="col-4">
                     <p>Receiver : {direction.receiver}</p>
                     <p>Street : {direction.street}</p>
                  </div>
                  <div className="col-4">
                     <p>Number : {direction.number}</p>
                     <p>Department : {direction.department}</p>
                  </div>
                  <div className="col-4">
                     <p>Zip Code : {direction.zipCode}</p>
                     <p>City : {direction.city}</p>
                     <p>State : {direction.state}</p>
                  </div>
               </div>
               <button
                  type="button"
                  onClick={() => formik.setValues(directionNoAlias)}
               >
                  SELECT THIS ADDRESS
               </button>
            </div>
         </div>
      </div>
   )
}

export default AddressCard
