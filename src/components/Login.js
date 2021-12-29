import React, { createContext } from 'react'
import axios from 'axios'
//import { Container } from 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Grid, TextField, Button, FormLabel } from "@material-ui/core";
import { ReactSession } from 'react-client-session';

import { useNavigate } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
export const LoginDetails = createContext();

export default function Login() {

    const userObj = {

        "email": '',
        "password": '',
    }

    const userDetail = {
        "firstName": '',
        "lastName": '',
        "city": '',
        "email": '',
        "address": '',
        "state": '',
        "email": '',
        "mobile": '',
    }

    const navigate = useNavigate();
    const stateMessage = (false);
    const detailsinvalideset = false
    const email = '', password = ''
    const [user, setUser] = React.useState(userObj)

    const [uservalidationE, setValidationE] = React.useState(email)
    const [uservalidationP, setValidationP] = React.useState(password)

    const onChange = (event) => {

        setUser({ ...user, [event.target.name]: event.target.value })

    }
    const [userDetails, setUserDetails] = React.useState({});
    const [showing, showingSet] = React.useState(stateMessage)
    const [Invalideset, InvalideSet] = React.useState(detailsinvalideset)

    const sendData = () => {

        if (user.email.length == 0) {
            setValidationE({ email: 'email should not empty' })
        }

        if (user.password.length == 0) {
            setValidationP({ password: 'password should not empty' })
        }
        axios.post("http://localhost:8080/loginUser", user)
            .then(response => {

                if (response.data.status == 200) {
                    ReactSession.setStoreType("localStorage");
                    ReactSession.set("userData", response.data.token);
                    setUserDetails(response.data)
                    showingSet(true)

                    navigate('/')

                } else if (response.data.status == 400) {

                    InvalideSet(true)
                    throw new Error('Something went wrong ...');
                }
            }).catch(error => {
                console.log("something bad happened somewhere, rollback!", error);
            });

    }

    return (

        <div className="container-fluid">
            ( < LoginDetails.Provider value={userDetails} >
                {console.log(userDetails, 'defination')}
                <Header />
                <Home />
            </LoginDetails.Provider >)
            <Container maxWidth="md" style={{ border: "40px solid #f2e9e9" }}>
                <Grid item xs={6} md={3} style={{ paddingLeft: "40%", margin: "40px" }}>
                    <FormLabel variant="contained" >Login</FormLabel>
                </Grid>
                <form onChange={onChange} >
                    <Grid container spacing={2} style={{}}>

                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Email" variant="outlined" name="email" onChange={onChange} required />
                        </Grid>
                        <p style={{
                            display: (uservalidationE.email ? 'block' : 'none'), color: 'red', display: 'inline',
                        }}>{uservalidationE.email}</p>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Password" type="password" variant="outlined" name="password" onChange={onChange} required />
                        </Grid>
                        <p style={{
                            display: (uservalidationP.password ? 'block' : 'none'), color: 'red', display: 'inline'
                        }}>{uservalidationP.password}</p>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" onClick={sendData}>Submit</Button>
                        </Grid>


                        <p style={{
                            display: (showing ? 'block' : 'none'), color: 'green', textAlign: 'center',
                        }}>{'login Succussfully..!!'}</p>
                        <p style={{
                            display: (Invalideset ? 'block' : 'none'), color: 'red', textAlign: 'center',
                        }}>{'user details not correct..!!'}</p>
                    </Grid>
                </form>
            </Container>

        </div >
    )

}
