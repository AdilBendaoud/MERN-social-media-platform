import React from "react";
import Form from "./Form";
export default function LoginPage() {
  return (
  <div className='bg-dark' style={{height:"100vh"}}>
    <nav className="text-info d-flex align-items-center justify-content-center fw-bold fs-2  border-bottom" style={{height:'8%'}}>Social Club</nav>
    <div className="d-flex align-items-center justify-content-center" style={{height:'92%'}}>
      <Form />
    </div>
  </div>);
}
