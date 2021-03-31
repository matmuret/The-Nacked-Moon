import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className="row check-steps">
            <div className={props.step1 ? 'active':''}><p>Sign-In</p></div>
            <div className={props.step2 ? 'active':''}><p>Shipping</p></div>
            <div className={props.step3 ? 'active':''}><p>Payment</p></div>
            <div className={props.step4 ? 'active':''}><p>Place Order</p></div>
            
        </div>
    )
}
