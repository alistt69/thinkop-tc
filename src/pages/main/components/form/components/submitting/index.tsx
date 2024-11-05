import classes from "./classes.module.scss";
import arrowIcon from '../../../../assets/arrow.png';
import React from "react";
import { notification } from "antd";
import { IData } from "@/models/formData";


const Submitting: React.FC<{isFormValid: boolean, formData: IData}> = ({ isFormValid, formData }) => {

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (pauseOnHover: boolean) => () => {

        let message = 'Данные сохранены!'
        let description = 'Вы можете посмотреть их в логах';

        if (isFormValid) {
            if (formData.unNumber) {
                const pattern = /^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$/
                if (!pattern.test(formData.unNumber)) {
                    message = "№УНФ введён некорректно"
                    description = "Пример УНФ: 890-000-000-00-000"
                }
            }
        } else {
            message = "Заполните все необходимые поля"
            description = "Необходимые поля помечены символом '*'"
        }

        api.open({
            message: message,
            description: description,
            showProgress: true,
            pauseOnHover,
        });
    };

    return(
        <>
            {contextHolder}

            <div onClick={openNotification(true)} className={classes.submit_container}>
                <button type="submit"
                        className={`${classes.submit_btn} ${isFormValid ? classes.able : classes.disable}`}>
                    Следующий шаг <img src={arrowIcon} alt={""}/>
                </button>
            </div>
        </>
    )
}

export default Submitting;
