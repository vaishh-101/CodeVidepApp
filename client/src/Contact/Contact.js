//contact.js

import React, { useState } from "react";


const Contact = () => {
  
  return (
    <form>
      <h1 className="text-center">Contact Us</h1>
      <div class="container">
  {/* <h3 class="text-center">Contact</h3> */}
  <p class="text-center"><em><h4>We love our fans!</h4></em></p>
  <div class="row test">
    <div class="col-md-4">
     <h4> <p>Fan? Drop a note.</p>
      <p><span class="glyphicon glyphicon-map-marker"></span>IMS Ahmednagar</p>
      <p><span class="glyphicon glyphicon-phone"></span>Phone: +91 9498900000</p>
      <p><span class="glyphicon glyphicon-envelope"></span>Email: vaishnavichoudhary200@gmail.com</p></h4>
    </div>
   
    </div>
  </div>
    </form>
  );
};

export default Contact;