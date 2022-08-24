import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues, reset } from 'redux-form';

export const Success = () => {
    const formValues: any = useSelector((state: any) => getFormValues('ContactForm')(state));
    const fullAddress = [formValues?.address, formValues?.ward, formValues?.district, formValues?.city].filter(v => !!v).join(', ');
    const email = formValues?.email;
    const fullName = [formValues?.firstName || '', formValues?.lastName || ''].map(v => v.trim()).join(' ').trim();
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(reset('ContactForm'));
        };
    });
    return (
        <div style={{width: '100%'}}>
            <h1>THANK YOU!</h1>
            {fullAddress && <p>Your address: {fullAddress }</p>}
            {email && <p>Email: {email }</p>}
            {fullName && <p>Name: {fullName }</p>}
        </div>
    );
};
