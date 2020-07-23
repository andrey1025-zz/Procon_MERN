import React, { useState } from "react";

import { FaSpin } from '../components/FaSpin';

function Button({ title, onClick, disabled = false, loading = false, icon = false, className = "submit-button btn-block btn-lg waves-effect waves-light" }) {
    if (loading) {
        return (
            <button type="submit" disabled={disabled} onClick={onClick} className={className}
            >
                <FaSpin />
            </button>
        )
    } else {
        return (
            <button type="submit" disabled={disabled} onClick={onClick} className={className}
            >{title}
            </button>
        );
    }
}
export default Button;
