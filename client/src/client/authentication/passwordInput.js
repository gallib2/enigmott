import React, { useState } from 'react';

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from '@material-ui/core/FormHelperText';

import './authForm.scss';

const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        props.handlePasswordChange(event);
    }

    return (
        <FormControl
            className='auth-form'
            variant="outlined"
        >
            <InputLabel htmlFor="outlined-adornment-password" className='auth-text-field'>
                Password
            </InputLabel>
            <OutlinedInput
                className='auth-text-field'
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={props.password}
                onChange={handlePasswordChange}
                error={props.error}
                name='password'
                onBlur={props.handleBlur}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
            />
            <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
        </FormControl>
    );
}

export default PasswordInput;