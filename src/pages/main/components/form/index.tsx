import Resetting from "@/pages/main/components/form/components/resetting";
import Submitting from "@/pages/main/components/form/components/submitting";
import Inputs from "@/pages/main/components/form/components/inputs";
import React, { ReactNode, useEffect, useState } from "react";
import classes from "./classes.module.scss";
import { IData } from "@/models/formData";


const Form: React.FC<{children: ReactNode}> = ({ children }) => {

    const initialState: IData = {
        projectName: '',
        genre: '',
        format: '',
        unNumber: '',
        country: '',
        budget: '',
        synopsis: '',
    };

    const [formData, setFormData] = useState<IData>(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : initialState;
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {

        localStorage.setItem('formData', JSON.stringify(formData));

        const isValid: boolean =
            !!formData.projectName &&
            !!formData.genre &&
            !!formData.format &&
            !!formData.country;

        setIsFormValid(isValid);
    }, [formData]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleReset = () => {
        setFormData(initialState);
        localStorage.removeItem('formData');
    };

    return (
        <>
            <form onSubmit={handleSubmit} onReset={handleReset} className={classes.forms_container}>

                <div className={classes.heading}>
                    {children}
                    <Resetting />
                </div>

                <Inputs formData={formData} setFormData={setFormData}/>

                <Submitting formData={formData} isFormValid={isFormValid}/>
            </form>
        </>
    )
}

export default Form;
