import React, { useState } from 'react';
import {
    Field,
    reduxForm,
    InjectedFormProps,
    WrappedFieldProps
} from 'redux-form';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControlLabel, {
    FormControlLabelProps
} from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Select, Switch } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { formValidatorHelper } from '../helpers/FormValidator';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    }
}));

const renderTextField: React.FC<WrappedFieldProps & TextFieldProps> = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <TextField
        label={label}
        error={touched && error}
        helperText={error}
        margin='normal'
        variant='outlined'
        fullWidth
        {...input}
        {...custom}
    />
);

const renderToggle: React.FC<
    WrappedFieldProps & FormControlLabelProps & TextFieldProps
> = ({ input, label }) => (
    <FormControlLabel control={<Switch checked={input.value ? true : false} onChange={input.onChange} />} label={label} />
);

const renderSelectField: React.FC<any> = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl error={touched && error} style={{ width: '100%' }}>
        <InputLabel>{label}</InputLabel>
        <Select
            {...input}
            {...custom}
            native
            fullWidth
        >
            {children}
        </Select>
    </FormControl>
)

type ComponentProps = InjectedFormProps<{}, {}>;

const ContactFormComponent: React.FC<ComponentProps> = (props) => {
    const { handleSubmit, reset, pristine, submitting, valid } = props;
    const [checked, setChecked] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    const switchHandler = (event: any) => {
        setChecked(event.target.checked);
    };

    const onClickSubmit = (event: any) => {
        event.preventDefault();
        navigate('/success');
    };
    const districts = ['', 'Hai Chau', 'Lien Chieu'];
    const wards = ['', 'Hoa Minh', 'Hoa Hai'];
    const cities = ['', 'Da Nang', 'Ha Noi'];
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Field name='fullAddress' component={renderToggle} onChange={switchHandler} label='Full Address' /> {checked}
            <Field name='address' component={renderTextField} label='Your Address' />
            {!checked ? (
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={4} xs={12}>
                        <Field
                            name='ward'
                            component={renderSelectField}
                            label='Ward'
                        >
                            {wards.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                        </Field>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                        <Field
                            name='district'
                            component={renderSelectField}
                            label='District'
                        >
                            {districts.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                        </Field>
                    </Grid>
                    <Grid item lg={4} sm={4} xs={12}>
                        <Field
                            name='city'
                            component={renderSelectField}
                            label='City'
                        >
                            {cities.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                        </Field>
                    </Grid>
                </Grid>
            ) : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={6}><Field name='firstName' component={renderTextField} label='First Name' /></Grid>
                <Grid item xs={12} sm={6} lg={6}><Field name='lastName' component={renderTextField} label='Last Name' /></Grid>
            </Grid>


            <Field name='email' component={renderTextField} label='Email' />

            <div>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    disabled={!valid || pristine || submitting}
                    onClick={onClickSubmit}
                >
                    Submit
                </Button>
                <Button
                    style={{ marginLeft: '8px' }}
                    type='submit'
                    color='secondary'
                    variant='contained'
                    disabled={pristine || submitting}
                    onClick={reset}
                >
                    Reset
                </Button>
            </div>

        </form>
    );
};

export default reduxForm<{}>({
    form: 'ContactForm',
    destroyOnUnmount: false,
    validate: formValidatorHelper
})(ContactFormComponent);
