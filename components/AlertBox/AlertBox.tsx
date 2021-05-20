import { Button } from "@material-ui/core";
import React from "react";
interface alertBox {
    label?: string;
    message: string;
    buttons?: Array<{
        text: string;
        onClick: () => void;
    }>;
    onClose: () => void;
}
function AlertBox({ label, message, buttons, onClose }: alertBox) {
    return (
        <div className='alert-con'>
            <div className='alert-con-dup' onClick={() => onClose()}></div>
            <div className='alert'>
                <h3>{label ? label : "Alert"}</h3>
                <p>{message}</p>
                <div className='buttons'>
                    {buttons ? (
                        buttons.map((btn) => (
                            <Button onClick={() => btn.onClick()}>
                                {btn.text}
                            </Button>
                        ))
                    ) : (
                        <Button onClick={() => onClose()}>Okay</Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AlertBox;
