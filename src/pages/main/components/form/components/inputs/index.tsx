import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import classes from "./classes.module.scss";
import { IData } from "@/models/formData";
import Navigation from "@/pages/main/components/form/components/inputs/navigation";


const Inputs: React.FC<{formData: IData, setFormData: Dispatch<SetStateAction<IData>>}> = ({ formData, setFormData }) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: IData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUnNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3) + '-' + value.slice(3);
        if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7);
        if (value.length > 11) value = value.slice(0, 11) + '-' + value.slice(11);
        if (value.length > 14) value = value.slice(0, 14) + '-' + value.slice(14, 17);

        setFormData((prevData: IData) => ({
            ...prevData,
            unNumber: value,
        }));
    };

    const handleNavigationClick = (index: number) => {
        setSelectedIndex(index);
        inputRefs.current[index]?.focus();
    };

    return (
        <div className={classes.form}>
            <div>
                <div className={classes.form_container}>
                    <input
                        ref={(el) => (inputRefs.current[0] = el!)}
                        onClick={() => handleNavigationClick(0)}
                        type="text"
                        id="projectName"
                        name="projectName"
                        placeholder="placeholder"
                        className={classes.form_field}
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="projectName" className={classes.form_label}>Название проекта*</label>
                </div>

                <div className={classes.form_container}>
                    <select
                        ref={(el) => (inputRefs.current[1] = el!)}
                        onClick={() => handleNavigationClick(1)}
                        id="genre"
                        name="genre"
                        className={`${classes.form_field} ${!formData.genre && classes.select_option}`}
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите жанр</option>
                        <option value="action">Экшн</option>
                        <option value="drama">Драма</option>
                        <option value="comedy">Комедия</option>
                    </select>
                    <label htmlFor="genre" className={classes.form_label}>Жанр*</label>
                </div>

                <div className={classes.form_container}>
                    <select
                        ref={(el) => (inputRefs.current[2] = el!)}
                        onClick={() => handleNavigationClick(2)}
                        id="format"
                        name="format"
                        className={`${classes.form_field} ${!formData.format && classes.select_option}`}
                        value={formData.format}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите формат</option>
                        <option value="online">Онлайн-платформа</option>
                        <option value="cinema">Большой экран</option>
                        <option value="internet">Интернет</option>
                    </select>
                    <label htmlFor="format" className={classes.form_label}>Формат*</label>
                </div>

                <div className={classes.form_container}>
                    <input
                        type="text"
                        id="unNumber"
                        name="unNumber"
                        placeholder="890-000-000-00-000"
                        className={classes.form_field}
                        value={formData.unNumber}
                        onChange={handleUnNumberChange}
                    />
                    <label htmlFor="unNumber" className={classes.form_label}>№ УНФ</label>
                </div>
            </div>

            <div>
                <div className={classes.form_container}>
                    <select
                        ref={(el) => (inputRefs.current[3] = el!)}
                        onClick={() => handleNavigationClick(3)}
                        id="country"
                        name="country"
                        className={`${classes.form_field} ${!formData.country && classes.select_option}`}
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите страну</option>
                        <option value="russia">Россия</option>
                        <option value="usa">США</option>
                        <option value="uk">Великобритания</option>
                    </select>
                    <label htmlFor="country" className={classes.form_label}>Страна-производитель (копродукция)*</label>
                </div>

                <div className={classes.form_container}>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        placeholder="placeholder"
                        className={classes.form_field}
                        value={formData.budget}
                        onChange={handleChange}
                    />
                    <label htmlFor="budget" className={classes.form_label}>Сметная стоимость (₽)</label>
                </div>

                <div className={classes.form_container}>
                    <textarea
                        id="synopsis"
                        name="synopsis"
                        placeholder="placeholder"
                        className={`${classes.form_field} ${classes.form_area}`}
                        value={formData.synopsis}
                        onChange={handleChange}
                    />
                    <label htmlFor="synopsis" className={classes.form_label}>Синопсис</label>
                </div>
            </div>

            <Navigation formData={formData} handleNavigationClick={handleNavigationClick} inputRefs={inputRefs} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
        </div>
    );
};

export default Inputs;
